import "server-only";

import { cookies } from "next/headers";
import { UsersList } from "@/utils/types/userType";

export default async function getUsers() {
    try {
        const cookieStore = (await cookies()).toString();
        const result = await fetch(`${process.env.NEXTAUTH_URL}/api/protected/users`, {
            headers: {
                Cookie: cookieStore,
            },
            cache: "no-store",
        });

        if (!result.ok) {
            throw new Error("Failed to fetch data");
        }

        const data: { message: string, allUsers: UsersList } = await result.json();
        return data.allUsers;
    }
    catch {
        return null;
    }
};