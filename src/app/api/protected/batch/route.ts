import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin, verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { verifySubscription } from "@/lib/subscriptionCheck";
import { batchFormInput, BatchFormInput } from "@/utils/validators/batchInput";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        if (token.role === "ADMIN") {
            const isAdmin = await verifyAdmin(req);

            if (!isAdmin) {
                return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
            }

            const allBatches = await prisma.batch.findMany({});

            if (!(allBatches.length > 0)) {
                return Response.json({ message: "Batch not found!!!" }, { status: 404 });
            }

            return Response.json({ message: "Successfully found all batches!!!", allBatches }, { status: 200 });
        }

        const subscriptionCheck = await verifySubscription(token.sub ? token.sub : "");

        if (!subscriptionCheck) {

        }

        if (subscriptionCheck?.userStatus === "SUSPENDED") {
            return Response.json({
                error: "Account suspended!!!",
                message: "Your account has been suspended. Contact support."
            }, { status: 403 });
        }

        if (subscriptionCheck?.userStatus === "ACTIVE" && subscriptionCheck.subscriptionStatus === "INACTIVE") {
            const allBatches = await prisma.batch.findMany({
                where: {
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
                orderBy: {
                    createdAt: "desc",
                },
                take: 5,
            });

            if (!(allBatches.length > 0)) {
                return Response.json({ message: "Batch not found!!!" }, { status: 404 });
            }

            return Response.json({ message: "Successfully found all batches!!!", allBatches }, { status: 200 });
        }

        const allBatches = await prisma.batch.findMany({
            where: {
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
            orderBy: {
                createdAt: "desc",
            },
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

        return Response.json({ message: "Successfully created the batch!!!", batchData }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};