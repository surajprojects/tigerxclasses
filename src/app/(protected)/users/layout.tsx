import { getSessionOrRedirect } from "@/lib/verifyUser";

export default async function UserLayout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await getSessionOrRedirect();

    if (session.user.role !== "ADMIN") {
        return <p className="italic text-red-500 font-semibold">Admin not found!!!</p>;
    }

    return (
        <>
            {children}
        </>
    );
};