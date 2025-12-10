import "server-only";

import { cookies } from "next/headers";

export default async function getPayments() {
    try {
        const cookieStore = (await cookies()).toString();
        const result = await fetch(`${process.env.NEXTAUTH_URL}/api/protected/payments`, {
            headers: {
                Cookie: cookieStore,
            },
            cache: "no-store",
        });

        if (!result.ok) {
            throw new Error("Failed to fetch data");
        }

        const data: { message: string, studentsData: any } = await result.json();
        return data.studentsData;
    }
    catch {
        return null;
    }
};