import SideBar from "@/components/home/sideBar";

export default function AuthLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="flex">
                <SideBar />
                <div className="grow">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};