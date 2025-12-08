import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allStudents = await prisma.student.findMany({
            where: {
                userId: String(token.id),
                isDeleted: false,
            },
            select: {
                createdAt: true,
                studentCourses: {
                    where: {
                        isDeleted: false,
                    },
                    select: {
                        status: true,
                        totalFees: true,
                        payments: {
                            where: {
                                isDeleted: false,
                            },
                        },
                    },
                },
            },
        });

        const studentsByMonth: Record<string, typeof allStudents> = {};

        allStudents.forEach(student => {
            const date = new Date(student.createdAt);
            const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`; // e.g., "2025-12"

            if (!studentsByMonth[monthKey]) {
                studentsByMonth[monthKey] = [];
            }

            studentsByMonth[monthKey].push(student);
        });

        const studentsData = allStudents.map((student) => {
            return {
                totalFees: student.studentCourses.reduce((sum, fees) => sum + fees.totalFees, 0),
                paidFees: student.studentCourses.reduce((sum, payment) => sum + payment.payments.reduce((sum, fees) => sum + fees.amount, 0), 0),
                isActive: student.studentCourses.filter((stdCourse) => stdCourse.status === "ACTIVE").length > 0,
            }
        });

        const dashboardData = {
            studentsByMonth,
            totalStudents: allStudents.length,
            activeStudents: studentsData.filter((student) => student.isActive === true).length,
            totalFeesPaid: studentsData.reduce((sum, payment) => sum + payment.paidFees, 0),
            totalFees: studentsData.reduce((sum, payment) => sum + payment.totalFees, 0),
        };

        return Response.json({ message: "Successfully found all students!!!", dashboardData }, { status: 200 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};