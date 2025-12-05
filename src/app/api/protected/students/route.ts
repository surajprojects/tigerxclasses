import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin, verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { verifyUserSubscription } from "@/lib/verifyUserSubscription";
import { studentFormInput, StudentFormInput } from "@/utils/validators/studentInput";

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
                    createdAt: "asc",
                },
                take: 10,
            });

            if (!(allStudents.length > 0)) {
                return Response.json({ message: "Students not found!!!" }, { status: 404 });
            }

            return Response.json({ message: "Successfully found all students!!!", allStudents }, { status: 200 });
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