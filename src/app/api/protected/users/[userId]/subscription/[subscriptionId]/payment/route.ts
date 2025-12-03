import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { PaymentFormInput, paymentFormInput } from "@/utils/validators/paymentInput";

export async function POST(req: NextRequest, { params }: { params: Promise<{ userId: string, subscriptionId: string }> }) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { userId, subscriptionId } = await params;

        const data: PaymentFormInput = await req.json();
        const parsedInput = paymentFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        if (!(parsedInput.data.amount > 0)) {
            return Response.json({ message: "User payment must be greater than zero. Negative or zero amounts aren&#8217;t allowed." }, { status: 400 });
        }

        const foundUser = await prisma.subscription.findUnique({
            where: {
                id: subscriptionId,
                userId,
                isDeleted: false,
            },
            include: {
                payments: true,
            },
        });

        if (!foundUser) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        const totalPaidFees = foundUser.payments.reduce((sum, payment) => sum + payment.amount, 0);

        if (!(foundUser.amount >= (totalPaidFees + parsedInput.data.amount))) {
            return Response.json({ message: "User payment cannot exceed total amount!!!" }, { status: 400 });
        }

        const paymentData = await prisma.userPayment.create({
            data: {
                subscriptionId,
                amount: parsedInput.data.amount,
                method: parsedInput.data.method,
                date: new Date(parsedInput.data.date).toISOString(),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            }
        });

        return Response.json({ message: "Successfully saved the payment!!!", paymentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};