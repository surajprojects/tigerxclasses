import prisma from "@/db";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { userFormInputEdit, UserFormInputEdit } from "@/utils/validators/userInput";

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { userId } = await params;

        const userData = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                address: true,
                subscriptions: {
                    where: {
                        isDeleted: false,
                    },
                    include: {
                        payments: {
                            where: {
                                isDeleted: false,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    }
                },
            },
        });

        if (!userData) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the user!!!", userData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { userId } = await params;
        const data: UserFormInputEdit = await req.json();
        const parsedInput = userFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const userData = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...(parsedInput.data.username && { username: parsedInput.data.username }),
                ...(parsedInput.data.password && { password: bcrypt.hashSync(parsedInput.data.password, 10) }),
                ...(parsedInput.data.fullName && { fullName: parsedInput.data.fullName }),
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
                ...(parsedInput.data.dob && { dob: new Date(parsedInput.data.dob) }),
                ...(parsedInput.data.gender && { gender: parsedInput.data.gender }),
                ...(parsedInput.data.category && { category: parsedInput.data.category }),
                ...(parsedInput.data.email && { email: parsedInput.data.email }),
                ...(parsedInput.data.mobileNo && { mobileNo: parsedInput.data.mobileNo }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.instituteAddress && { instituteAddress: parsedInput.data.instituteAddress }),
                ...(parsedInput.data.contactNo && { contactNo: parsedInput.data.contactNo }),
                ...(parsedInput.data.address && {
                    address: {
                        update: {
                            ...(parsedInput.data.address.flatHouseBuilding && { flatHouseBuilding: parsedInput.data.address.flatHouseBuilding }),
                            ...(parsedInput.data.address.streetOrArea && { streetOrArea: parsedInput.data.address.streetOrArea }),
                            ...(parsedInput.data.address.landmark && { landmark: parsedInput.data.address.landmark }),
                            ...(parsedInput.data.address.city && { city: parsedInput.data.address.city }),
                            ...(parsedInput.data.address.state && { state: parsedInput.data.address.state }),
                            ...(parsedInput.data.address.pincode && { pincode: parsedInput.data.address.pincode }),
                        },
                    },
                }),
            },
        });

        return Response.json({ message: "Successfully updated the user!!!", userData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { userId } = await params;

        const userData = await prisma.user.update({
            where: {
                id: userId,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
                deletedOn: new Date().toISOString(),
            },
        });

        return Response.json({ message: "Successfully deleted the user!!!", userData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};