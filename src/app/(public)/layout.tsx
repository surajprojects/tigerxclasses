import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

export default function PublicLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex flex-1 flex-col items-center justify-center bg-linear-to-r from-[#f9fcff] to-white py-36">
                    <h1 className="text-5xl text-blue-500 font-bold">Tiger Classes</h1>
                    <p className="text-xl my-4 mb-10 text-gray-400">Student Management System</p>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};