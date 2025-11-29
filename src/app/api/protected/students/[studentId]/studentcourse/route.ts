import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin, verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { studentCourseInput, StudentCourseInput } from "@/utils/validators/studentCourseInput";
import { verifyUserSubscription } from "@/lib/verifyUserSubscription";

export async function POST(req: NextRequest, { params }: { params: Promise<{ studentId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = await params;

        if (token.role === "ADMIN") {
            const isAdmin = await verifyAdmin(req);

            if (!isAdmin) {
                return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
            }

            const data: StudentCourseInput = await req.json();
            const parsedInput = studentCourseInput.safeParse(data);

            if (!parsedInput.success) {
                return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
            }

            const studentCourseData = await prisma.studentCourse.create({
                data: {
                    studentId,
                    batchId: parsedInput.data.batchId,
                    courseId: parsedInput.data.courseId,
                    totalFees: Number(parsedInput.data.totalFees),
                    enrolledOn: new Date(parsedInput.data.enrolledOn).toISOString(),
                    session: parsedInput.data.session,
                    ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
                }
            });

            return Response.json({ message: "Successfully created the student course!!!", studentCourseData }, { status: 201 });
        }

        const data: StudentCourseInput = await req.json();
        const parsedInput = studentCourseInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const subscriptionCheck = await verifyUserSubscription(token.sub ? token.sub : "");

        if (!subscriptionCheck) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        if (subscriptionCheck.userStatus === "SUSPENDED") {
            return Response.json({ message: "Your account has been suspended. Contact support." }, { status: 403 });
        }

        if (subscriptionCheck.userStatus === "INACTIVE") {
            const getStudentCoursesData = await prisma.studentCourse.findMany({
                where: {
                    studentId: studentId,
                    isDeleted: false,
                },
            });

            if (getStudentCoursesData.length > 1) {
                return Response.json({ message: "You&#8217;ve reached your account limit. No more than 2 student courses can be created." }, { status: 402 });
            }

            const studentCourseData = await prisma.studentCourse.create({
                data: {
                    studentId,
                    batchId: parsedInput.data.batchId,
                    courseId: parsedInput.data.courseId,
                    totalFees: Number(parsedInput.data.totalFees),
                    enrolledOn: new Date(parsedInput.data.enrolledOn).toISOString(),
                    session: parsedInput.data.session,
                    ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
                }
            });

            return Response.json({ message: "Successfully created the student course!!!", studentCourseData }, { status: 201 });
        }

        if (subscriptionCheck.userStatus === "ACTIVE") {
            const studentCourseData = await prisma.studentCourse.create({
                data: {
                    studentId,
                    batchId: parsedInput.data.batchId,
                    courseId: parsedInput.data.courseId,
                    totalFees: Number(parsedInput.data.totalFees),
                    enrolledOn: new Date(parsedInput.data.enrolledOn).toISOString(),
                    session: parsedInput.data.session,
                    ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
                }
            });

            return Response.json({ message: "Successfully created the student course!!!", studentCourseData }, { status: 201 });
        }
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};