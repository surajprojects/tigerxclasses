import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ paymentId: string, subscriptionId: string }> }) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { paymentId, subscriptionId } = await params;

        const paymentData = await prisma.userPayment.update({
            where: {
                id: paymentId,
                subscriptionId,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
                deletedOn: new Date().toISOString(),
            },
        });

        return Response.json({ message: "Successfully deleted the payment!!!", paymentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};