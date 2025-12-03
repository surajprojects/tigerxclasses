import "server-only";

import { cookies } from "next/headers";
import { StudentData } from "@/utils/types/studentType";

export default async function getStudent(studentId = "1") {
    try {
        const cookieStore = (await cookies()).toString();
        const result = await fetch(`${process.env.NEXTAUTH_URL}/api/protected/students/${studentId}`, {
            headers: {
                Cookie: cookieStore,
            },
            cache: "no-store",
        });

        if (!result.ok) {
            throw new Error("Failed to fetch data");
        }

        const data: { message: string, studentData: StudentData } = await result.json();
        return data.studentData;
    }
    catch {
        return null;
    }
};