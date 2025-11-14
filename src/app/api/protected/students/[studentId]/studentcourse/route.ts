import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { studentCourseInput, StudentCourseInput } from "@/utils/validators/studentCourseInput";

export async function POST(req: NextRequest, { params }: { params: { studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = params;
        const data: StudentCourseInput = await req.json();
        const parsedInput = studentCourseInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const studentCourseData = await prisma.studentCourse.create({
            data: {
                studentId,
                batchId: parsedInput.data.batchCode,
                courseId: parsedInput.data.courseCode,
                totalFees: parsedInput.data.totalFees,
                enrolledOn: new Date(parsedInput.data.enrolledOn).toISOString(),
                session: parsedInput.data.session,
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            }
        });

        return Response.json({ message: "Successfully created the student course!!!", studentCourseData }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};