import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { userSubscriptionInput, UserSubscriptionInput } from "@/utils/validators/userSubscriptionInput";

export async function POST(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { userId } = await params;

        const data: UserSubscriptionInput = await req.json();
        const parsedInput = userSubscriptionInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const expiresOn = new Date();
        expiresOn.setDate(expiresOn.getDate() + 30);

        const userSubscriptionData = await prisma.subscription.create({
            data: {
                userId,
                name: parsedInput.data.name,
                plan: parsedInput.data.plan,
                amount: parsedInput.data.amount,
                startedOn: new Date(),
                expiresOn,
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            }
        });

        return Response.json({ message: "Successfully created the user subscription!!!", userSubscriptionData }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};