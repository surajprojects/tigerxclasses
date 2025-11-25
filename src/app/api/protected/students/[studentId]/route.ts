import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { studentFormInputEdit, StudentFormInputEdit } from "@/utils/validators/studentInput";

export async function GET(req: NextRequest, { params }: { params: Promise<{ studentId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = await params;
        const studentData = await prisma.student.findUnique({
            where: {
                id: studentId,
                userId: String(token.id),
                isDeleted: false,
            },
            select: {
                id: true,
                rollNo: true,
                fullName: true,
                dob: true,
                gender: true,
                category: true,
                mobileNo: true,
                email: true,
                fatherName: true,
                motherName: true,
                parentGuardianMobileNo1: true,
                parentGuardianMobileNo2: true,
                class: true,
                institute: true,
                instituteName: true,
                session: true,
                remarks: true,
                address: {
                    omit: {
                        isDeleted: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                documents: {
                    omit: {
                        isDeleted: true,
                        updatedAt: true,
                    },
                },
                studentCourses: {
                    select: {
                        batch: {
                            omit: {
                                isDeleted: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                        course: {
                            omit: {
                                isDeleted: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                        payments: {
                            where: {
                                isDeleted: false,
                            },
                            omit: {
                                isDeleted: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                        enrolledOn: true,
                        feesStatus: true,
                        id: true,
                        remarks: true,
                        session: true,
                        status: true,
                        totalFees: true,
                        student: {
                            select: {
                                fullName: true,
                            },
                        },
                    },
                    where: {
                        isDeleted: false,
                    }
                },
            },
        });

        if (!studentData) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the student!!!", studentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ studentId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = await params;
        const data: StudentFormInputEdit = await req.json();
        const parsedInput = studentFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const studentData = await prisma.student.update({
            where: {
                id: studentId,
                userId: String(token.id),
                isDeleted: false,
            },
            data: {
                // Personal info           
                ...(parsedInput.data.fullName && { fullName: parsedInput.data.fullName }),
                ...(parsedInput.data.dob && { dob: new Date(parsedInput.data.dob).toISOString() }),
                ...(parsedInput.data.gender && { gender: parsedInput.data.gender }),
                ...(parsedInput.data.category && { category: parsedInput.data.category }),
                ...(parsedInput.data.mobileNo && { mobileNo: parsedInput.data.mobileNo }),
                ...(parsedInput.data.email && { email: parsedInput.data.email }),

                // Family info                          
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
                ...(parsedInput.data.parentGuardianMobileNo1 && { parentGuardianMobileNo1: parsedInput.data.parentGuardianMobileNo1 }),
                ...(parsedInput.data.parentGuardianMobileNo2 && { parentGuardianMobileNo2: parsedInput.data.parentGuardianMobileNo2 }),

                // Education info
                ...(parsedInput.data.class && { class: parsedInput.data.class }),
                ...(parsedInput.data.institute && { institute: parsedInput.data.institute }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.session && { session: parsedInput.data.session }),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),

                // Address info
                address: {
                    update: {
                        ...(parsedInput.data.address?.flatHouseBuilding && { flatHouseBuilding: parsedInput.data.address.flatHouseBuilding }),
                        ...(parsedInput.data.address?.streetOrArea && { streetOrArea: parsedInput.data.address.streetOrArea }),
                        ...(parsedInput.data.address?.landmark && { landmark: parsedInput.data.address.landmark }),
                        ...(parsedInput.data.address?.state && { state: parsedInput.data.address.state }),
                        ...(parsedInput.data.address?.city && { city: parsedInput.data.address.city }),
                        ...(parsedInput.data.address?.pincode && { pincode: parsedInput.data.address.pincode }),
                    }
                }
            }
        });

        return Response.json({ message: "Successfully updated the student!!!", studentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ studentId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = await params;

        const studentData = await prisma.student.update({
            where: {
                id: studentId,
                userId: String(token.id),
                isDeleted: false,
            },
            data: {
                isDeleted: true,
            }
        });

        return Response.json({ message: "Successfully deleted the student!!!", studentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};