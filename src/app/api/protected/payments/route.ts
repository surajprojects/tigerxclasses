import prisma from "@/db";
import { NextRequest } from "next/server";
import { Category, Gender } from "@/db/generated/prisma";
import { verifyAdmin, verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { verifyUserSubscription } from "@/lib/verifyUserSubscription";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        if (token.role === "ADMIN") {
            const isAdmin = await verifyAdmin(req);

            if (!isAdmin) {
                return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
            }

            const allStudents = await prisma.student.findMany({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                },
                include: {
                    studentCourses: {
                        where: {
                            isDeleted: false,
                        },
                        include: {
                            batch: true,
                            course: true,
                            payments: {
                                where: {
                                    isDeleted: false,
                                },
                            },
                        }
                    }
                },
            });

            if (!allStudents) {
                return Response.json({ message: "Student not found!!!" }, { status: 404 });
            }

            const studentsData = allStudents.map((student) => {
                return {
                    id: student.id,
                    rollNo: student.rollNo,
                    fullName: student.fullName,
                    fatherName: student.fatherName,
                    totalFees: student.studentCourses.reduce((sum, fees) => sum + fees.totalFees, 0),
                    paidFees: student.studentCourses.reduce((sum, payment) => sum + payment.payments.reduce((sum, fees) => sum + fees.amount, 0), 0),
                    status: student.studentCourses.map((status) => {
                        if (status.feesStatus !== "PAID") {
                            return { feesStatus: status.feesStatus, status: status.status };
                        }
                    }),
                }
            });

            return Response.json({ message: "Successfully found all students!!!", studentsData }, { status: 200 });
        }

        const subscriptionCheck = await verifyUserSubscription(token.sub ? token.sub : "");

        if (!subscriptionCheck) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        if (subscriptionCheck.userStatus === "SUSPENDED") {
            return Response.json({ message: "Your account has been suspended. Contact support." }, { status: 403 });
        }

        // INACTIVE users are allowed for free app usage
        if (subscriptionCheck.userStatus === "INACTIVE") {
            const searchParams = req.nextUrl.searchParams;

            // Pagination Params
            const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
            const take = searchParams.get("limit") ? Number(searchParams.get("limit")) : 5;
            const skip = (currentPage - 1) * take;

            // Search & Filter Params
            const fullName = searchParams.get("name");
            const rollNo = searchParams.get("rollno");
            const fatherName = searchParams.get("fathername");
            const motherName = searchParams.get("mothername");
            const dob = searchParams.get("dob");
            const gender = searchParams.get("gender");
            const category = searchParams.get("category");
            const mobileNo = searchParams.get("mobileno");

            const studentsCount = await prisma.student.count({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                    ...(fullName && fullName.length > 0 && { fullName }),
                    ...(rollNo && rollNo.length > 0 && { rollNo: Number(rollNo) }),
                    ...(fatherName && fatherName.length > 0 && { fatherName }),
                    ...(motherName && motherName.length > 0 && { motherName }),
                    ...(dob && dob.length > 0 && { dob: new Date(dob).toISOString() }),
                    ...(gender && gender.length > 0 && { gender: gender as Gender }),
                    ...(category && category.length > 0 && { category: category as Category }),
                    ...(mobileNo && mobileNo.length > 0 && { mobileNo }),
                },
            });

            if (!(studentsCount > 0)) {
                return Response.json({ message: "Students not found!!!" }, { status: 404 });
            }

            const allStudentsData = await prisma.student.findMany({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                    ...(fullName && fullName.length > 0 && { fullName }),
                    ...(rollNo && rollNo.length > 0 && { rollNo: Number(rollNo) }),
                    ...(fatherName && fatherName.length > 0 && { fatherName }),
                    ...(motherName && motherName.length > 0 && { motherName }),
                    ...(dob && dob.length > 0 && { dob: new Date(dob).toISOString() }),
                    ...(gender && gender.length > 0 && { gender: gender as Gender }),
                    ...(category && category.length > 0 && { category: category as Category }),
                    ...(mobileNo && mobileNo.length > 0 && { mobileNo }),
                },
                include: {
                    studentCourses: {
                        where: {
                            isDeleted: false,
                        },
                        include: {
                            batch: true,
                            course: true,
                            payments: {
                                where: {
                                    isDeleted: false,
                                },
                            },
                        }
                    }
                },
                orderBy: {
                    createdAt: "asc",
                },
                take,
                skip,
            });

            const allStudents = allStudentsData.map((student) => {
                return {
                    id: student.id,
                    rollNo: student.rollNo,
                    fullName: student.fullName,
                    fatherName: student.fatherName,
                    totalFees: student.studentCourses.reduce((sum, fees) => sum + fees.totalFees, 0),
                    paidFees: student.studentCourses.reduce((sum, payment) => sum + payment.payments.reduce((sum, fees) => sum + fees.amount, 0), 0),
                    status: student.studentCourses.map((status) => {
                        if (status.feesStatus !== "PAID") {
                            return { feesStatus: status.feesStatus, status: status.status };
                        }
                    }),
                }
            });

            return Response.json({ message: "Successfully found all students!!!", allStudents, studentsCount }, { status: 200 });
        }

        if (subscriptionCheck.userStatus === "ACTIVE") {
            const searchParams = req.nextUrl.searchParams;

            // Pagination Params
            const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
            const take = searchParams.get("limit") ? Number(searchParams.get("limit")) : 5;
            const skip = (currentPage - 1) * take;

            // Search & Filter Params
            const fullName = searchParams.get("name");
            const rollNo = searchParams.get("rollno");
            const fatherName = searchParams.get("fathername");
            const motherName = searchParams.get("mothername");
            const dob = searchParams.get("dob");
            const gender = searchParams.get("gender");
            const category = searchParams.get("category");
            const mobileNo = searchParams.get("mobileno");

            const studentsCount = await prisma.student.count({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                    ...(fullName && fullName.length > 0 && { fullName }),
                    ...(rollNo && rollNo.length > 0 && { rollNo: Number(rollNo) }),
                    ...(fatherName && fatherName.length > 0 && { fatherName }),
                    ...(motherName && motherName.length > 0 && { motherName }),
                    ...(dob && dob.length > 0 && { dob: new Date(dob).toISOString() }),
                    ...(gender && gender.length > 0 && { gender: gender as Gender }),
                    ...(category && category.length > 0 && { category: category as Category }),
                    ...(mobileNo && mobileNo.length > 0 && { mobileNo }),
                },
            });

            if (!(studentsCount > 0)) {
                return Response.json({ message: "Students not found!!!" }, { status: 404 });
            }

            const allStudentsData = await prisma.student.findMany({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                    ...(fullName && fullName.length > 0 && { fullName }),
                    ...(rollNo && rollNo.length > 0 && { rollNo: Number(rollNo) }),
                    ...(fatherName && fatherName.length > 0 && { fatherName }),
                    ...(motherName && motherName.length > 0 && { motherName }),
                    ...(dob && dob.length > 0 && { dob: new Date(dob).toISOString() }),
                    ...(gender && gender.length > 0 && { gender: gender as Gender }),
                    ...(category && category.length > 0 && { category: category as Category }),
                    ...(mobileNo && mobileNo.length > 0 && { mobileNo }),
                },
                include: {
                    studentCourses: {
                        where: {
                            isDeleted: false,
                        },
                        include: {
                            batch: true,
                            course: true,
                            payments: {
                                where: {
                                    isDeleted: false,
                                },
                            },
                        }
                    }
                },
                orderBy: {
                    createdAt: "asc",
                },
                take,
                skip,
            });

            const allStudents = allStudentsData.map((student) => {
                return {
                    id: student.id,
                    rollNo: student.rollNo,
                    fullName: student.fullName,
                    fatherName: student.fatherName,
                    totalFees: student.studentCourses.reduce((sum, fees) => sum + fees.totalFees, 0),
                    paidFees: student.studentCourses.reduce((sum, payment) => sum + payment.payments.reduce((sum, fees) => sum + fees.amount, 0), 0),
                    status: student.studentCourses.map((status) => {
                        if (status.feesStatus !== "PAID") {
                            return { feesStatus: status.feesStatus, status: status.status };
                        }
                    }),
                }
            });

            return Response.json({ message: "Successfully found all students!!!", allStudents, studentsCount }, { status: 200 });
        }
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};