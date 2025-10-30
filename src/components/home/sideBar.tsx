import Link from "next/link";
import { DollarSign, ChartColumn, LogOutIcon } from "lucide-react";
import { XMarkIcon, UsersIcon, BookOpenIcon } from "@heroicons/react/24/outline";

export default function SideBar() {
    return (
        <>
            <aside className="bg-white w-xs h-full flex flex-col border-r border-gray-200">
                {/* Title Container */}
                <div className="px-10 flex justify-between items-center border-b border-gray-200 py-6">
                    <Link href="/" className="text-2xl font-bold hover:cursor-pointer text-blue-500">Tiger Classes</Link>
                    <button
                        type="button"
                        className="hover:bg-gray-100 p-1.5 rounded-md cursor-pointer duration-300 ease-out"
                    >
                        <XMarkIcon className="size-5" />
                    </button>
                </div>
                {/* Wrapper Container */}
                <nav className="px-4 py-4 grow flex flex-col justify-between">
                    {/* Navigation Routes */}
                    <div className="flex flex-col font-medium text-gray-800">
                        <Link
                            href="/dashboard"
                            className="mb-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer shadow-lg shadow-blue-300 border border-gray-200 duration-300 ease-out flex items-center">
                            <ChartColumn className="size-5 mr-3" />
                            Dashboard
                        </Link>
                        <Link
                            href="/students"
                            className="my-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer duration-300 ease-out flex items-center">
                            <UsersIcon className="size-5 mr-3" />
                            Students
                        </Link>
                        <Link
                            href="/batch"
                            className="my-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer duration-300 ease-out flex items-center">
                            <BookOpenIcon className="size-5 mr-3" />
                            Batches
                        </Link>
                        <Link
                            href="/course"
                            className="my-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer duration-300 ease-out flex items-center">
                            <BookOpenIcon className="size-5 mr-3" />
                            Courses
                        </Link>
                        <Link
                            href="/feestracker"
                            className="my-1 px-5 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer duration-300 ease-out flex items-center">
                            <DollarSign className="size-5 mr-3" />
                            Fees Tracker
                        </Link>
                    </div>
                    {/* Control Settings */}
                    <div className="flex flex-col font-medium text-gray-800 border-t border-gray-200 pt-8 pb-1">
                        <Link
                            href="#"
                            className="my-1 px-5 py-2 rounded-xl hover:bg-red-500 hover:text-white hover:cursor-pointer border border-gray-200 duration-300 ease-out flex justify-center items-center">
                            <LogOutIcon className="size-5 mr-3" />
                            Logout
                        </Link>
                        {/* <BtnLogout /> */}
                    </div>
                </nav>
            </aside>
        </>
    );
};