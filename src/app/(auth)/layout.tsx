import Header from "@/components/dashboard/header";
import SideBar from "@/components/home/sideBar";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <SideBar />
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