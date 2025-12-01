import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";

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