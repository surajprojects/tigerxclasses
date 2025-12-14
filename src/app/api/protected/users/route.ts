import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin, verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { UserProfileFormEdit, userProfileFormEdit } from "@/utils/validators/userInput";
import { Prisma } from "@/db/generated/prisma";

export async function GET(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allUsers = await prisma.user.findMany({
            where: {
                role: "USER",
            },
            select: {
                id: true,
                fullName: true,
                instituteName: true,
                email: true,
                mobileNo: true,
                username: true,
                status: true,
                isDeleted: true,
            },
        });

        if (!(allUsers.length > 0)) {
            return Response.json({ message: "Users not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all users!!!", allUsers }, { status: 200 });
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

        if (!token.sub) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const userId = token.sub;
        const data: UserProfileFormEdit = await req.json();
        const parsedInput = userProfileFormEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const address = parsedInput.data.address;

        const hasAddressData =
            address?.streetOrArea ||
            address?.city ||
            address?.state ||
            address?.pincode;

        const updateAddress: Prisma.UserUpdateInput = {};

        if (hasAddressData) {
            updateAddress.address = {
                upsert: {
                    update: {
                        ...(parsedInput.data.address?.flatHouseBuilding && { flatHouseBuilding: parsedInput.data.address.flatHouseBuilding }),
                        streetOrArea: parsedInput.data.address?.streetOrArea,
                        ...(parsedInput.data.address?.landmark && { landmark: parsedInput.data.address.landmark }),
                        city: parsedInput.data.address?.city,
                        state: parsedInput.data.address?.state,
                        ...(parsedInput.data.address?.pincode && { pincode: parsedInput.data.address.pincode }),
                    },
                    create: {
                        ...(parsedInput.data.address!.flatHouseBuilding && { flatHouseBuilding: parsedInput.data.address!.flatHouseBuilding }),
                        streetOrArea: parsedInput.data.address!.streetOrArea,
                        ...(parsedInput.data.address!.landmark && { landmark: parsedInput.data.address!.landmark }),
                        city: parsedInput.data.address!.city,
                        state: parsedInput.data.address!.state,
                        ...(parsedInput.data.address!.pincode && { pincode: parsedInput.data.address!.pincode }),
                    },
                },
            };
        }

        const userData = await prisma.user.update({
            where: {
                id: String(userId),
                isDeleted: false,
            },
            data: {
                ...(parsedInput.data.fullName && { fullName: parsedInput.data.fullName }),
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
                ...(parsedInput.data.dob && { dob: new Date(parsedInput.data.dob).toISOString() }),
                ...(parsedInput.data.gender && { gender: parsedInput.data.gender }),
                ...(parsedInput.data.category && { category: parsedInput.data.category }),
                ...(parsedInput.data.mobileNo && { mobileNo: parsedInput.data.mobileNo }),
                ...(parsedInput.data.email && { email: parsedInput.data.email }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.instituteAddress && { instituteAddress: parsedInput.data.instituteAddress }),
                ...(parsedInput.data.contactNo && { contactNo: parsedInput.data.contactNo }),
                ...(parsedInput.data.address && updateAddress.address),
            },
            select: {
                id: true,
                fullName: true,
                instituteName: true,
                email: true,
                mobileNo: true,
                username: true,
            }
        });

        return Response.json({ message: "Successfully updated the user!!!", userData }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};