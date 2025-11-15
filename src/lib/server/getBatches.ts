import "server-only";

import { cookies } from "next/headers";
import { BatchesList } from "@/utils/types/batchType";

export default async function getBatches() {
    try {
        const cookieStore = (await cookies()).toString();
        const result = await fetch(`${process.env.NEXTAUTH_URL}/api/protected/batch`, {
            headers: {
                Cookie: cookieStore,
            },
            cache: "no-store",
        });

        if (!result.ok) {
            throw new Error("Failed to fetch user");
        }
        const data: { message: string, allBatches: BatchesList } = await result.json();
        return data.allBatches;
    }
    catch {
        return null;
    }
};