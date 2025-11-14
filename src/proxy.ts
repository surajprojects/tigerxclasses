import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    },
});

export const config = {
    matcher: [
        "/batch/:path*",
        "/course/:path*",
        "/dashboard/:path*",
        "/payments/:path*",
        "/students/:path*",
        "/api/protected/:path*",
    ],
};