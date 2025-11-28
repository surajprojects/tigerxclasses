import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin, verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { courseFormInput, CourseFormInput } from "@/utils/validators/courseInput";
import { verifyUserSubscription } from "@/lib/verifyUserSubscription";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        if (token.role === "ADMIN") {
            const isAdmin = await verifyAdmin(req);

            if (!isAdmin) {
                return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
            }

            const allCourses = await prisma.course.findMany({});

            if (!(allCourses.length > 0)) {
                return Response.json({ message: "Course not found!!!" }, { status: 404 });
            }

            return Response.json({ message: "Successfully found all courses!!!", allCourses }, { status: 200 });
        }

        const subscriptionCheck = await verifyUserSubscription(token.sub ? token.sub : "");

        if (!subscriptionCheck) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        if (subscriptionCheck.userStatus === "SUSPENDED") {
            return Response.json({ message: "Your account has been suspended. Contact support." }, { status: 403 });
        }

        // INACTIVE users are allowed for free app usage
        if (subscriptionCheck.userStatus === "INACTIVE") {
            const allCourses = await prisma.course.findMany({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    instituteName: true,
                    code: true,
                    duration: true,
                    fees: true,
                    _count: {
                        select: { students: true },
                    },
                },
                orderBy: {
                    createdAt: "asc",
                },
                take: 5,
            });

            if (!(allCourses.length > 0)) {
                return Response.json({ message: "Course not found!!!" }, { status: 404 });
            }

            return Response.json({ message: "Successfully found all courses!!!", allCourses }, { status: 200 });
        }

        if (subscriptionCheck.userStatus === "ACTIVE") {
            const allCourses = await prisma.course.findMany({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    instituteName: true,
                    code: true,
                    duration: true,
                    fees: true,
                    _count: {
                        select: { students: true },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            if (!(allCourses.length > 0)) {
                return Response.json({ message: "Course not found!!!" }, { status: 404 });
            }

            return Response.json({ message: "Successfully found all courses!!!", allCourses }, { status: 200 });
        }
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

        if (token.role === "ADMIN") {
            const isAdmin = await verifyAdmin(req);

            if (!isAdmin) {
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
                    fees: Number(parsedInput.data.fees),
                },
                include: {
                    students: true,
                },
            });

            return Response.json({ message: "Successfully created the course!!!", courseData }, { status: 201 });
        }

        const data: CourseFormInput = await req.json();
        const parsedInput = courseFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const subscriptionCheck = await verifyUserSubscription(token.sub ? token.sub : "");

        if (!subscriptionCheck) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        if (subscriptionCheck.userStatus === "SUSPENDED") {
            return Response.json({ message: "Your account has been suspended. Contact support." }, { status: 403 });
        }

        if (subscriptionCheck.userStatus === "INACTIVE") {
            const getCoursesData = await prisma.course.findMany({
                where: {
                    userId: String(token.id),
                    isDeleted: false,
                },
            });

            if (getCoursesData.length > 4) {
                return Response.json({ message: "You&#8217;ve reached your account limit. No more than 5 courses can be created." }, { status: 402 });
            }

            const courseData = await prisma.course.create({
                data: {
                    userId: String(token.id),
                    code: parsedInput.data.code,
                    name: parsedInput.data.name,
                    description: parsedInput.data.description,
                    instituteName: parsedInput.data.instituteName,
                    duration: parsedInput.data.duration,
                    fees: Number(parsedInput.data.fees),
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    instituteName: true,
                    code: true,
                    duration: true,
                    fees: true,
                    _count: {
                        select: { students: true },
                    },
                },
            });

            return Response.json({ message: "Successfully created the course!!!", courseData }, { status: 201 });
        }

        if (subscriptionCheck.userStatus === "ACTIVE") {
            const courseData = await prisma.course.create({
                data: {
                    userId: String(token.id),
                    code: parsedInput.data.code,
                    name: parsedInput.data.name,
                    description: parsedInput.data.description,
                    instituteName: parsedInput.data.instituteName,
                    duration: parsedInput.data.duration,
                    fees: Number(parsedInput.data.fees),
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    instituteName: true,
                    code: true,
                    duration: true,
                    fees: true,
                    _count: {
                        select: { students: true },
                    },
                },
            });

            return Response.json({ message: "Successfully created the course!!!", courseData }, { status: 201 });
        }
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};