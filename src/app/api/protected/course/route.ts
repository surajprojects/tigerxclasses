import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { courseFormInput, CourseFormInput } from "@/utils/validators/courseInput";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allCourses = await prisma.course.findMany({
            where: {
                userId: String(token.id),
                isDeleted: false,
            },
            include: { students: true }
        });

        if (!(allCourses.length > 0)) {
            return Response.json({ message: "Course not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all courses!!!", allCourses }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function POST(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const data: CourseFormInput = await req.json();
        const parsedInput = courseFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const courseData = await prisma.course.create({
            data: {
                userId: String(token.id),
                code: parsedInput.data.code,
                name: parsedInput.data.name,
                description: parsedInput.data.description,
                instituteName: parsedInput.data.instituteName,
                duration: parsedInput.data.duration,
                fees: parsedInput.data.fees,
            }
        });

        return Response.json({ message: "Successfully created the course!!!", courseData }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};