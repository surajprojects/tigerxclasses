import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";

export async function DELETE(req: NextRequest, { params }: { params: { paymentId: string, studentCourseId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { paymentId, studentCourseId } = params;

        const paymentData = await prisma.payment.update({
            where: {
                id: paymentId,
                studentCourseId,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
            },
        });

        return Response.json({ message: "Successfully deleted the payment!!!", paymentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};