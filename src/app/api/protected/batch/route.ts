import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin, verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { verifyUserSubscription } from "@/lib/verifyUserSubscription";
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

        const subscriptionCheck = await verifyUserSubscription(token.sub ? token.sub : "");

        if (!subscriptionCheck) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        if (subscriptionCheck.userStatus === "SUSPENDED") {
            return Response.json({ message: "Your account has been suspended. Contact support." }, { status: 403 });
        }

        // INACTIVE users are allowed for free app usage
        if (subscriptionCheck.userStatus === "INACTIVE") {
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
                    createdAt: "asc",
                },
                take: 5,
            });

            if (!(allBatches.length > 0)) {
                return Response.json({ message: "Batch not found!!!" }, { status: 404 });
            }

            return Response.json({ message: "Successfully found all batches!!!", allBatches }, { status: 200 });
        }

        if (subscriptionCheck.userStatus === "ACTIVE") {
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

        if (token.role === "ADMIN") {
            const isAdmin = await verifyAdmin(req);

            if (!isAdmin) {
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
                include: {
                    students: true,
                }
            });

            return Response.json({ message: "Successfully created the batch!!!", batchData }, { status: 201 });
        }

        const data: BatchFormInput = await req.json();
        const parsedInput = batchFormInput.safeParse(data);

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
            const getBatchesData = await prisma.batch.findMany({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                },
            });

            if (getBatchesData.length > 4) {
                return Response.json({ message: "You&#8217;ve reached your account limit. No more than 5 batches can be created." }, { status: 402 });
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

        if (subscriptionCheck.userStatus === "ACTIVE") {
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
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};