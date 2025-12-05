import "server-only";

import { cookies } from "next/headers";

export default async function getDashboard() {
    try {
        const cookieStore = (await cookies()).toString();
        const result = await fetch(`${process.env.NEXTAUTH_URL}/api/protected/dashboard`, {
            headers: {
                Cookie: cookieStore,
            },
            cache: "no-store",
        });

        if (!result.ok) {
            throw new Error("Failed to fetch data");
        }

        const data: { message: string, dashboardData: any } = await result.json();
        return data.dashboardData;
    }
    catch {
        return null;
    }
};