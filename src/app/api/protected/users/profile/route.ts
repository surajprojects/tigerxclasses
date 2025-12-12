import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { supabaseServerClient } from "@/lib/supabaseServerClient";

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        if (!token.sub) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const userData = await prisma.user.findUnique({
            where: {
                id: String(token.sub),
                isDeleted: false,
            },
            include: {
                address: true,
            }
        });

        if (!userData) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found the user!!!", userData }, { status: 200 });
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

        if (!token.sub) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const userId = token.sub;

        const form = await req.formData();
        const file = form.get("file") as File;
        const type = form.get("type") as string;

        let filePath = "";

        if (type === "profile") {
            filePath = `users/${userId}/profile.jpeg`;
        }

        if (type === "institute") {
            filePath = `users/${userId}/institute.jpeg`;
        }

        if (type === "student") {
            const studentId = form.get("studentId") as string;
            filePath = `students/${userId}/${studentId}.jpeg`;
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        await supabaseServerClient.storage.from("avatars").upload(filePath, buffer, {
            contentType: "image/jpeg",
            upsert: true,
        });

        const imageUrl = supabaseServerClient.storage.from("avatars").getPublicUrl(filePath).data.publicUrl;

        if (type === "student") {
            const studentId = form.get("studentId") as string;
            await prisma.student.update({
                where: {
                    id: studentId,
                    isDeleted: false,
                },
                data: {
                    photo: imageUrl,
                },
            });
        }
        else if (type === "institute") {
            await prisma.user.update({
                where: {
                    id: userId,
                    isDeleted: false,
                },
                data: {
                    logo: imageUrl,
                },
            });
        }
        else {
            await prisma.user.update({
                where: {
                    id: userId,
                    isDeleted: false,
                },
                data: {
                    photo: imageUrl,
                },
            });
        }

        return Response.json({ message: "Successfully saved the image!!!", imageUrl }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};