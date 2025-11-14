import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth";

export async function verifyUser(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return null;
    }

    return token;
};

export async function getSessionOrRedirect() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/")
    }

    return session;
};