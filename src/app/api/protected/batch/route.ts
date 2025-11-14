import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { batchFormInput, BatchFormInput } from "@/utils/validators/batchInput";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allBatches = await prisma.batch.findMany({
            where: {
                userId: String(token.id),
                isDeleted: false,
            },
            include: { students: true }
        });

        if (!(allBatches.length > 0)) {
            return Response.json({ message: "Batch not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all batches!!!", allBatches }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function POST(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const data: BatchFormInput = await req.json();
        const parsedInput = batchFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const batchData = await prisma.batch.create({
            data: {
                userId: String(token.id),
                code: parsedInput.data.code,
                name: parsedInput.data.name,
                time: parsedInput.data.time,
                ...(parsedInput.data.description && { description: parsedInput.data.description }),
                ...(parsedInput.data.startDate && { startDate: parsedInput.data.startDate }),
                ...(parsedInput.data.endDate && { endDate: parsedInput.data.startDate }),
            }
        });

        return Response.json({ message: "Successfully created the batch!!!", batchData }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};