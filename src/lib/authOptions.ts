import prisma from "@/db";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface User extends DefaultUser {
        role: string;
    }

    interface Session {
        user: {
            role: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (req.method !== "POST") return null;

                const userData = await prisma.user.findUnique({
                    where: { username: credentials?.username || "" },
                });

                if (!userData) return null;

                const passwordCheck = await bcrypt.compare(
                    credentials?.password || "",
                    userData.password
                );

                if (!passwordCheck) return null;

                return {
                    id: userData.id,
                    username: userData.username,
                    name: userData.fullName,
                    email: userData.email,
                    role: userData.role,
                    image: userData.photo,
                };
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.sub = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.role = token.role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};