import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { PaymentFormInput, paymentFormInput } from "@/utils/validators/paymentInput";

export async function POST(req: NextRequest, { params }: { params: { studentId: string, studentCourseId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId, studentCourseId } = params;
        const data: PaymentFormInput = await req.json();
        const parsedInput = paymentFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const foundStudent = await prisma.student.findUnique({
            where: {
                id: studentId,
                userId: String(token.id),
                isDeleted: false,
            },
            include: {
                studentCourses: {
                    where: {
                        id: studentCourseId,
                    },
                    include: {
                        payments: true,
                    }
                }
            },
        });

        if (!foundStudent) {
            return Response.json({ message: "Student not found!!!" }, { status: 404 });
        }

        const totalPaidFees = foundStudent.studentCourses[0].payments.reduce((sum, payment) => sum + payment.amount, 0);

        if (!(foundStudent.studentCourses[0].totalFees >= (totalPaidFees + parsedInput.data.amount))) {
            return Response.json({ message: "Student payment cannot exceed total fees amount!!!" }, { status: 409 });
        }

        const paymentData = await prisma.payment.create({
            data: {
                studentCourseId,
                amount: parsedInput.data.amount,
                date: new Date(parsedInput.data.date).toISOString(),
                method: parsedInput.data.method,
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            }
        });

        return Response.json({ message: "Successfully saved the payment!!!", paymentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};