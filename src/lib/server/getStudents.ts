import "server-only";

import { cookies } from "next/headers";
import { StudentsList } from "@/utils/types/studentType";

export default async function getStudents() {
    try {
        const cookieStore = (await cookies()).toString();
        const result = await fetch(`${process.env.NEXTAUTH_URL}/api/protected/students`, {
            headers: {
                Cookie: cookieStore,
            },
            cache: "no-store",
        });

        if (!result.ok) {
            throw new Error("Failed to fetch data");
        }

        const data: { message: string, allStudents: StudentsList } = await result.json();
        return data.allStudents;
    }
    catch {
        return null;
    }
};