import prisma from "@/db";

export async function verifyUserSubscription(userId: string) {
    const userData = await prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false,
        },
        select: {
            id: true,
            status: true,
            currentSubscriptionId: true,
            subscriptions: true,
        },
    });

    if (!userData) {
        return null;
    }

    if (userData.status === "ACTIVE") {
        const currentSubscriptionData = userData.subscriptions.filter((subscription) => subscription.id === userData.currentSubscriptionId);

        if ((currentSubscriptionData.length > 0) && (!(currentSubscriptionData[0].expiresOn >= new Date()))) {
            const userData = await prisma.user.update({
                where: {
                    id: userId,
                    isDeleted: false,
                },
                data: {
                    status: "INACTIVE",
                },
            });

            return { userStatus: userData.status };
        }
    }

    return { userStatus: userData.status };
};