import "server-only";

import { cookies } from "next/headers";
import { UserData } from "@/utils/types/userType";

export default async function getUser(userId = "1") {
    try {
        const cookieStore = (await cookies()).toString();
        const result = await fetch(`${process.env.NEXTAUTH_URL}/api/protected/users/${userId}`, {
            headers: {
                Cookie: cookieStore,
            },
            cache: "no-store",
        });

        if (!result.ok) {
            throw new Error("Failed to fetch user");
        }

        const data: { message: string, userData: UserData } = await result.json();
        return data.userData;
    }
    catch {
        return null;
    }
};