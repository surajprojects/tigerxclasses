import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { BatchFormInputEdit, batchFormInputEdit } from "@/utils/validators/batchInput";

export async function GET(req: NextRequest, { params }: { params: Promise<{ batchId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { batchId } = await params;

        const batchData = await prisma.batch.findUnique({
            where: {
                id: batchId,
                userId: String(token.id),
                isDeleted: false,
            },
            select: {
                id: true,
                code: true,
                name: true,
                description: true,
                startDate: true,
                endDate: true,
                time: true,
                _count: {
                    select: { students: true },
                },
            },
        });

        if (!batchData) {
            return Response.json({ message: "Batch not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the batch!!!", batchData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ batchId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { batchId } = await params;
        const data: BatchFormInputEdit = await req.json();
        const parsedInput = batchFormInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const batchData = await prisma.batch.update({
            where: {
                id: batchId,
                userId: String(token.id),
                isDeleted: false,
            },
            data: {
                ...(parsedInput.data.code && { code: parsedInput.data.code }),
                ...(parsedInput.data.name && { name: parsedInput.data.name }),
                ...(parsedInput.data.time && { time: parsedInput.data.time }),
                ...(parsedInput.data.description && { description: parsedInput.data.description }),
                ...(parsedInput.data.startDate && { startDate: new Date(parsedInput.data.startDate).toISOString() }),
                ...(parsedInput.data.endDate && { endDate: new Date(parsedInput.data.endDate).toISOString() }),
            },
            select: {
                id: true,
                code: true,
                name: true,
                description: true,
                startDate: true,
                endDate: true,
                time: true,
                _count: {
                    select: { students: true },
                },
            },
        });

        return Response.json({ message: "Successfully updated the batch!!!", batchData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ batchId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { batchId } = await params;

        const studentBatchData = await prisma.student.findMany({
            where: {
                isDeleted: false,
                userId: String(token.id),
            },
            include: {
                studentCourses: {
                    where: {
                        batchId,
                        isDeleted: false,
                    },
                },
            },
        });

        if (studentBatchData.length > 0) {
            return Response.json({ message: "Batch cannot be deleted because it is currently in use!!!" }, { status: 409 });
        }

        const batchData = await prisma.batch.update({
            where: {
                id: batchId,
                userId: String(token.id),
                isDeleted: false,
            },
            data: {
                isDeleted: true,
                deletedOn: new Date().toISOString(),
            },
            select: {
                id: true,
                code: true,
                name: true,
                description: true,
                startDate: true,
                endDate: true,
                time: true,
                _count: {
                    select: { students: true },
                },
            },
        });

        return Response.json({ message: "Successfully deleted the batch!!!", batchData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};