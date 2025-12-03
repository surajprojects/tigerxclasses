import SideBar from "@/components/home/sideBar";
import Header from "@/components/dashboard/header";
import { getSessionOrRedirect } from "@/lib/verifyUser";

export default async function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await getSessionOrRedirect();
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <SideBar isAdmin={session.user.role === "ADMIN" ? true : false} />
                <div className="flex flex-col flex-1">
                    {/* Header */}
                    <Header />
                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto p-8 bg-[#f5f8fc]">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};