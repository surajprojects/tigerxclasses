import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { studentCourseInputEdit, StudentCourseInputEdit } from "@/utils/validators/studentCourseInput";

export async function GET(req: NextRequest, { params }: { params: Promise<{ studentCourseId: string, studentId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId, studentCourseId } = await params;

        const studentCourseData = await prisma.studentCourse.findUnique({
            where: {
                id: studentCourseId,
                studentId: studentId,
                isDeleted: false,
            },
            include: {
                batch: true,
                course: true,
                payments: true,
            }
        });

        if (!studentCourseData) {
            return Response.json({ message: "Student course not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found student course!!!", studentCourseData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ studentCourseId: string, studentId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentCourseId, studentId } = await params;
        const data: StudentCourseInputEdit = await req.json();
        const parsedInput = studentCourseInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const studentCourseData = await prisma.studentCourse.update({
            where: {
                id: studentCourseId,
                studentId,
                isDeleted: false,
            },
            data: {
                ...(parsedInput.data.batchId && { batchId: parsedInput.data.batchId }),
                ...(parsedInput.data.courseId && { courseId: parsedInput.data.courseId }),
                ...(parsedInput.data.totalFees && { totalFees: parsedInput.data.totalFees }),
                ...(parsedInput.data.status && { status: parsedInput.data.status }),
                ...(parsedInput.data.feesStatus && { feesStatus: parsedInput.data.feesStatus }),
                ...(parsedInput.data.enrolledOn && { enrolledOn: new Date(parsedInput.data.enrolledOn).toISOString() }),
                ...(parsedInput.data.session && { session: parsedInput.data.session }),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
            }
        });

        return Response.json({ message: "Successfully updated the student course!!!", studentCourseData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ studentId: string, studentCourseId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId, studentCourseId } = await params;

        const studentCourseData = await prisma.studentCourse.update({
            where: {
                id: studentCourseId,
                studentId,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
            }
        });

        return Response.json({ message: "Successfully deleted the student course!!!", studentCourseData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};