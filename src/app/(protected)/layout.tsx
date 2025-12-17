import SideBar from "@/components/home/sideBar";
import Header from "@/components/dashboard/header";
import { getSessionOrRedirect } from "@/lib/verifyUser";
import getUserProfile from "@/lib/server/getUserProfile";

export default async function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await getSessionOrRedirect();
    const userData = await getUserProfile();
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <SideBar
                    title={userData && userData.instituteName ? userData.instituteName : ""}
                    isAdmin={session.user.role === "ADMIN" ? true : false}
                    profileImg={userData && userData.photo ? `${userData.photo}?t=${Date.now()}` : "/avatar.png"}
                />
                <div className="flex flex-col flex-1">
                    {/* Header */}
                    <Header profileImg={userData && userData.logo ? `${userData.logo}?t=${Date.now()}` : "/avatar.png"} />
                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto p-8 bg-[#f5f8fc]">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};