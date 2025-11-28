import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { courseFormInputEdit, CourseFormInputEdit } from "@/utils/validators/courseInput";

export async function GET(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { courseId } = await params;

        const courseData = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId: String(token.id),
                isDeleted: false,
            },
            select: {
                id: true,
                name: true,
                description: true,
                instituteName: true,
                code: true,
                duration: true,
                fees: true,
                _count: {
                    select: { students: true },
                },
            },
        });

        if (!courseData) {
            return Response.json({ message: "Course not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the course!!!", courseData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { courseId } = await params;
        const data: CourseFormInputEdit = await req.json();
        const parsedInput = courseFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const courseData = await prisma.course.update({
            where: {
                id: courseId,
                userId: String(token.id),
                isDeleted: false,
            },
            data: {
                ...(parsedInput.data.code && { code: parsedInput.data.code }),
                ...(parsedInput.data.name && { name: parsedInput.data.name }),
                ...(parsedInput.data.description && { description: parsedInput.data.description }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.duration && { duration: parsedInput.data.duration }),
                ...(parsedInput.data.fees && { fees: Number(parsedInput.data.fees), }),
            },
            select: {
                id: true,
                name: true,
                description: true,
                instituteName: true,
                code: true,
                duration: true,
                fees: true,
                _count: {
                    select: { students: true },
                },
            },
        });

        return Response.json({ message: "Successfully updated the course!!!", courseData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { courseId } = await params;

        const courseData = await prisma.course.update({
            where: {
                id: courseId,
                userId: String(token.id),
                isDeleted: false,
            },
            data: {
                isDeleted: true,
            },
            select: {
                id: true,
                name: true,
                description: true,
                instituteName: true,
                code: true,
                duration: true,
                fees: true,
                _count: {
                    select: { students: true },
                },
            },
        });

        return Response.json({ message: "Successfully deleted the course!!!", courseData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};