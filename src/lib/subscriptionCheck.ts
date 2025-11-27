import prisma from "@/db";

export async function verifySubscription(userId: string) {
    const subscriptionData = await prisma.subscription.findFirst({
        where: {
            userId,
            isDeleted: false,
            expiresOn: { gte: new Date() },
        },
        include: {
            user: {
                select: {
                    status: true,
                },
            },
        },
    });

    if (!subscriptionData) {
        return null;
    }

    return {
        subscriptionStatus: subscriptionData.status,
        userStatus: subscriptionData.user.status,
    };
};