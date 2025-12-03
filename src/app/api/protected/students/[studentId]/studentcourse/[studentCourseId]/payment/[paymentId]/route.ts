import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ paymentId: string, studentCourseId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { paymentId, studentCourseId } = await params;

        const studentCourseData = await prisma.studentCourse.findUnique({
            where: {
                id: studentCourseId,
                isDeleted: false,
            },
            include: {
                payments: {
                    where: {
                        isDeleted: false,
                    },
                },
            },
        });

        if (!studentCourseData) {
            return Response.json({ message: "Invalid Student Course Id!!!" }, { status: 400 });
        }

        const paymentData = await prisma.payment.update({
            where: {
                id: paymentId,
                studentCourseId,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
                deletedOn: new Date().toISOString(),
            },
        });

        const totalPaidFees = studentCourseData.payments.reduce((sum, payment) => sum + payment.amount, 0);

        function updateFeesStatus() {
            if (studentCourseData) {
                if ((totalPaidFees - paymentData.amount) === 0) {
                    return "UNPAID";
                }
                else if (studentCourseData.totalFees > (totalPaidFees - paymentData.amount)) {
                    return "PARTIAL";
                }
                else if (studentCourseData.totalFees === (totalPaidFees - paymentData.amount)) {
                    return "PAID";
                }
            }
        };

        if (updateFeesStatus()) {
            await prisma.studentCourse.update({
                where: {
                    id: studentCourseId,
                    isDeleted: false,
                },
                data: {
                    feesStatus: updateFeesStatus(),
                },
            });
        };

        return Response.json({ message: "Successfully deleted the payment!!!", paymentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};