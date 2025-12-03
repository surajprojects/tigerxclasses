import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { userSubscriptionInputEdit, UserSubscriptionInputEdit } from "@/utils/validators/userSubscriptionInput";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ userId: string, subscriptionId: string }> }) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { userId, subscriptionId } = await params;

        const data: UserSubscriptionInputEdit = await req.json();
        const parsedInput = userSubscriptionInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const userSubscriptionData = await prisma.subscription.update({
            where: {
                id: subscriptionId,
                userId,
            },
            data: {
                ...(parsedInput.data.name && { name: parsedInput.data.name }),
                ...(parsedInput.data.plan && { plan: parsedInput.data.plan }),
                ...(parsedInput.data.amount && { amount: parsedInput.data.amount }),
                ...(parsedInput.data.startedOn && { startedOn: new Date(parsedInput.data.startedOn) }),
                ...(parsedInput.data.expiresOn && { expiresOn: new Date(parsedInput.data.expiresOn) }),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            }
        });

        return Response.json({ message: "Successfully updated the user subscription!!!", userSubscriptionData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ userId: string, subscriptionId: string }> }) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { userId, subscriptionId } = await params;

        const userSubscriptionData = await prisma.subscription.update({
            where: {
                id: subscriptionId,
                userId,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
                deletedOn: new Date().toISOString(),
            },
        });

        return Response.json({ message: "Successfully deleted the user subscription!!!", userSubscriptionData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};