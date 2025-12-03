import "server-only";

import { cookies } from "next/headers";
import { CoursesList } from "@/utils/types/courseType";

export default async function getCourses() {
    try {
        const cookieStore = (await cookies()).toString();
        const result = await fetch(`${process.env.NEXTAUTH_URL}/api/protected/course`, {
            headers: {
                Cookie: cookieStore,
            },
            cache: "no-store",
        });

        if (!result.ok) {
            throw new Error("Failed to fetch data");
        }

        const data: { message: string, allCourses: CoursesList } = await result.json();
        return data.allCourses;
    }
    catch {
        return null;
    }
};