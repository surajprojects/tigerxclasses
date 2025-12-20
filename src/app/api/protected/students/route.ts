import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin, verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { verifyUserSubscription } from "@/lib/verifyUserSubscription";
import { studentFormInput, StudentFormInput } from "@/utils/validators/studentInput";
import { Category, Gender } from "@/db/generated/prisma";

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
                include: {
                    studentCourses: {
                        include: {
                            batch: true,
                            course: true,
                        },
                    },
                },
            });

            if (!(allStudents.length > 0)) {
                return Response.json({ message: "Students not found!!!" }, { status: 404 });
            }

            return Response.json({ message: "Successfully found all students!!!", allStudents }, { status: 200 });
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

            const allStudents = await prisma.student.findMany({
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
                select: {
                    id: true,
                    rollNo: true,
                    fullName: true,
                    fatherName: true,
                    mobileNo: true,
                    gender: true,
                    studentCourses: {
                        select: {
                            id: true,
                            status: true,
                            enrolledOn: true,
                            course: {
                                omit: {
                                    createdAt: true,
                                    isDeleted: true,
                                    updatedAt: true,
                                },
                            },
                            batch: {
                                omit: {
                                    createdAt: true,
                                    isDeleted: true,
                                    updatedAt: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: "asc",
                },
                take,
                skip,
            });

            return Response.json({ message: "Successfully found all students!!!", allStudents, studentsCount }, { status: 200 });
        }

        if (subscriptionCheck.userStatus === "ACTIVE") {
            const allStudents = await prisma.student.findMany({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                },
                select: {
                    id: true,
                    rollNo: true,
                    fullName: true,
                    fatherName: true,
                    mobileNo: true,
                    studentCourses: {
                        select: {
                            id: true,
                            status: true,
                            enrolledOn: true,
                            course: {
                                omit: {
                                    createdAt: true,
                                    isDeleted: true,
                                    updatedAt: true,
                                },
                            },
                            batch: {
                                omit: {
                                    createdAt: true,
                                    isDeleted: true,
                                    updatedAt: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            if (!(allStudents.length > 0)) {
                return Response.json({ message: "Students not found!!!" }, { status: 404 });
            }

            return Response.json({ message: "Successfully found all students!!!", allStudents }, { status: 200 });
        }
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function POST(req: NextRequest) {
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

            const data: StudentFormInput = await req.json();
            const parsedInput = studentFormInput.safeParse(data);

            if (!parsedInput.success) {
                return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
            }

            const addressData = await prisma.address.create({
                data: {
                    ...(parsedInput.data.address.flatHouseBuilding && { flatHouseBuilding: parsedInput.data.address.flatHouseBuilding }),
                    streetOrArea: parsedInput.data.address.streetOrArea,
                    ...(parsedInput.data.address.landmark && { landmark: parsedInput.data.address.landmark }),
                    city: parsedInput.data.address.city,
                    state: parsedInput.data.address.state,
                    ...(parsedInput.data.address.pincode && { pincode: parsedInput.data.address.pincode }),
                }
            });

            const studentData = await prisma.student.create({
                data: {
                    rollNo: 1,
                    // Personal info
                    fullName: parsedInput.data.fullName,
                    dob: new Date(parsedInput.data.dob).toISOString(),
                    gender: parsedInput.data.gender,
                    category: parsedInput.data.category,
                    mobileNo: parsedInput.data.mobileNo,
                    ...(parsedInput.data.email && { email: parsedInput.data.email }),
                    addressId: addressData.id,

                    // Family info
                    fatherName: parsedInput.data.fatherName,
                    motherName: parsedInput.data.motherName,
                    ...(parsedInput.data.parentGuardianMobileNo1 && { parentGuardianMobileNo1: parsedInput.data.parentGuardianMobileNo1 }),
                    ...(parsedInput.data.parentGuardianMobileNo2 && { parentGuardianMobileNo2: parsedInput.data.parentGuardianMobileNo2 }),

                    // Education info
                    ...(parsedInput.data.class && { class: parsedInput.data.class }),
                    institute: parsedInput.data.institute,
                    ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                    ...(parsedInput.data.session && { remarks: parsedInput.data.session }),
                    ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),

                    userId: String(token.id),
                }
            });

            return Response.json({ message: "Successfully created the student!!!", studentData }, { status: 201 });
        }

        const data: StudentFormInput = await req.json();
        const parsedInput = studentFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const subscriptionCheck = await verifyUserSubscription(token.sub ? token.sub : "");

        if (!subscriptionCheck) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        if (subscriptionCheck.userStatus === "SUSPENDED") {
            return Response.json({ message: "Your account has been suspended. Contact support." }, { status: 403 });
        }

        if (subscriptionCheck.userStatus === "INACTIVE") {
            const getStudentsData = await prisma.student.findMany({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                },
            });

            if (getStudentsData.length > 9) {
                return Response.json({ message: "You&#8217;ve reached your account limit. No more than 10 students can be created." }, { status: 402 });
            }

            const lastStudent = await prisma.student.findFirst({
                where: {
                    userId: String(token.id),
                },
                orderBy: {
                    rollNo: "desc",
                },
                select: {
                    rollNo: true,
                },
            });

            const nextRollNo = lastStudent ? lastStudent.rollNo + 1 : 1;

            const addressData = await prisma.address.create({
                data: {
                    ...(parsedInput.data.address.flatHouseBuilding && { flatHouseBuilding: parsedInput.data.address.flatHouseBuilding }),
                    streetOrArea: parsedInput.data.address.streetOrArea,
                    ...(parsedInput.data.address.landmark && { landmark: parsedInput.data.address.landmark }),
                    city: parsedInput.data.address.city,
                    state: parsedInput.data.address.state,
                    ...(parsedInput.data.address.pincode && { pincode: parsedInput.data.address.pincode }),
                }
            });

            const studentData = await prisma.student.create({
                data: {
                    rollNo: nextRollNo,
                    userId: String(token.id),
                    // Personal info
                    fullName: parsedInput.data.fullName,
                    dob: new Date(parsedInput.data.dob).toISOString(),
                    gender: parsedInput.data.gender,
                    category: parsedInput.data.category,
                    mobileNo: parsedInput.data.mobileNo,
                    ...(parsedInput.data.email && { email: parsedInput.data.email }),
                    addressId: addressData.id,

                    // Family info
                    fatherName: parsedInput.data.fatherName,
                    motherName: parsedInput.data.motherName,
                    ...(parsedInput.data.parentGuardianMobileNo1 && { parentGuardianMobileNo1: parsedInput.data.parentGuardianMobileNo1 }),
                    ...(parsedInput.data.parentGuardianMobileNo2 && { parentGuardianMobileNo2: parsedInput.data.parentGuardianMobileNo2 }),

                    // Education info
                    ...(parsedInput.data.class && { class: parsedInput.data.class }),
                    institute: parsedInput.data.institute,
                    ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                    ...(parsedInput.data.session && { remarks: parsedInput.data.session }),
                    ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
                }
            });

            return Response.json({ message: "Successfully created the student!!!", studentData }, { status: 201 });
        }

        if (subscriptionCheck.userStatus === "ACTIVE") {
            const lastStudent = await prisma.student.findFirst({
                where: {
                    userId: String(token.id),
                },
                orderBy: {
                    rollNo: "desc",
                },
                select: {
                    rollNo: true,
                },
            });

            const nextRollNo = lastStudent ? lastStudent.rollNo + 1 : 1;

            const addressData = await prisma.address.create({
                data: {
                    ...(parsedInput.data.address.flatHouseBuilding && { flatHouseBuilding: parsedInput.data.address.flatHouseBuilding }),
                    streetOrArea: parsedInput.data.address.streetOrArea,
                    ...(parsedInput.data.address.landmark && { landmark: parsedInput.data.address.landmark }),
                    city: parsedInput.data.address.city,
                    state: parsedInput.data.address.state,
                    ...(parsedInput.data.address.pincode && { pincode: parsedInput.data.address.pincode }),
                }
            });

            const studentData = await prisma.student.create({
                data: {
                    rollNo: nextRollNo,
                    userId: String(token.id),
                    // Personal info
                    fullName: parsedInput.data.fullName,
                    dob: new Date(parsedInput.data.dob).toISOString(),
                    gender: parsedInput.data.gender,
                    category: parsedInput.data.category,
                    mobileNo: parsedInput.data.mobileNo,
                    ...(parsedInput.data.email && { email: parsedInput.data.email }),
                    addressId: addressData.id,

                    // Family info
                    fatherName: parsedInput.data.fatherName,
                    motherName: parsedInput.data.motherName,
                    ...(parsedInput.data.parentGuardianMobileNo1 && { parentGuardianMobileNo1: parsedInput.data.parentGuardianMobileNo1 }),
                    ...(parsedInput.data.parentGuardianMobileNo2 && { parentGuardianMobileNo2: parsedInput.data.parentGuardianMobileNo2 }),

                    // Education info
                    ...(parsedInput.data.class && { class: parsedInput.data.class }),
                    institute: parsedInput.data.institute,
                    ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                    ...(parsedInput.data.session && { remarks: parsedInput.data.session }),
                    ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
                }
            });

            return Response.json({ message: "Successfully created the student!!!", studentData }, { status: 201 });
        }
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};