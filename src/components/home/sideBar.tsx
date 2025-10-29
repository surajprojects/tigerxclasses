import Link from "next/link";

export default function SideBar() {
    return (
        <>
            <aside className="bg-white w-xs h-screen flex flex-col border-r border-gray-200">
                {/* Title Container */}
                <div className="px-4 flex justify-center border-b border-gray-200 py-6">
                    <Link href="/" className="text-2xl font-bold hover:cursor-pointer text-blue-500">Tiger Classes</Link>
                </div>
                {/* Wrapper Container */}
                <nav className="px-4 py-4 grow flex flex-col justify-between">
                    {/* Navigation Routes */}
                    <div className="flex flex-col font-medium text-gray-800">
                        <Link href="/dashboard" className="mb-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer shadow-lg shadow-blue-300 border border-gray-200">Dashboard</Link>
                        <Link href="/students" className="my-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer">Students</Link>
                        <Link href="/batch" className="my-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer">Batches</Link>
                        <Link href="/course" className="my-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer">Courses</Link>
                        <Link href="/feestracker" className="my-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer">Fees Tracker</Link>
                    </div>
                    {/* Control Settings */}
                    <div className="flex flex-col font-medium text-gray-800 border-t border-gray-200 pt-8 pb-1">
                        <Link href="#" className="my-1 px-5 py-2 rounded-xl hover:bg-red-500 hover:text-white hover:cursor-pointer border border-gray-200 text-center duration-300 ease-out">Logout</Link>
                        {/* <BtnLogout /> */}
                    </div>
                </nav>
            </aside>
        </>
    );
};