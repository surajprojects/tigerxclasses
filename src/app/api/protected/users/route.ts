import prisma from "@/db";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { verifyAdmin } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { userFormInput, UserFormInput } from "@/utils/validators/userInput";

export async function GET(req: NextRequest) {
    try {
        const isAdmin = await verifyAdmin(req);

        if (!isAdmin) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const allUsers = await prisma.user.findMany({
            where: {
                role: "USER",
            },
            select: {
                id: true,
                fullName: true,
                instituteName: true,
                email: true,
                mobileNo: true,
                username: true,
                status: true,
                isDeleted: true,
            },
        });

        if (!(allUsers.length > 0)) {
            return Response.json({ message: "Users not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found all users!!!", allUsers }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function POST(req: Request) {
    try {
        const data: UserFormInput = await req.json();
        const parsedInput = userFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(parsedInput.data.password, 10);

        await prisma.user.create({
            data: {
                fullName: parsedInput.data.fullName,
                dob: new Date(parsedInput.data.dob),
                gender: parsedInput.data.gender,
                category: parsedInput.data.category,
                email: parsedInput.data.email,
                mobileNo: parsedInput.data.mobileNo,
                instituteName: parsedInput.data.instituteName,
                username: parsedInput.data.username,
                password: hashedPassword,
            },
        });

        return Response.json({ message: "Successfully created the user!!!" }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};