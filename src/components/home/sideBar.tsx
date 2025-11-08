"use client"

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { UsersIcon } from "@heroicons/react/24/outline";
import { DollarSign, ChartColumn, LogOutIcon, PanelLeft, Notebook, BookOpenText } from "lucide-react";

export default function SideBar() {
    const pathname = usePathname();
    const [isCollapse, setIsCollapse] = useState(false);
    const nav = [
        { label: "Dashboard", icon: ChartColumn, href: "/dashboard" },
        { label: "Students", icon: UsersIcon, href: "/students" },
        { label: "Batch", icon: Notebook, href: "/batch" },
        { label: "Course", icon: BookOpenText, href: "/course" },
        { label: "Payments", icon: DollarSign, href: "/payments" },
    ];
    return (
        <>
            <aside className={isCollapse ? "bg-white w-16 h-full flex flex-col border-r border-gray-200 duration-300 ease-in-out" : "bg-white w-64 h-full flex flex-col border-r border-gray-200 duration-300 ease-in-out"}>
                {/* Title Container */}
                <div className="px-4 flex justify-between items-center border-b border-gray-200 py-6">
                    {!isCollapse && <Link href="/" className="ml-1 text-2xl font-bold hover:cursor-pointer text-blue-500">Tiger Classes</Link>}
                    <button
                        type="button"
                        onClick={() => setIsCollapse((prevData) => !prevData)}
                        className="hover:bg-gray-100 p-1.5 rounded-xl cursor-pointer duration-300 ease-out outline-none"
                    >
                        <PanelLeft className="size-5" />
                    </button>
                </div>
                {/* Wrapper Container */}
                <nav className="px-3 py-4 grow flex flex-col justify-between">
                    {/* Navigation Routes */}
                    <nav className="flex flex-col font-medium text-gray-800">
                        {nav.map((item, idx) => {
                            return <Link
                                key={idx}
                                href={item.href}
                                className={`my-1.5 ${isCollapse ? "px-2.5" : "px-5"} py-2 border-gray-200 outline-none rounded-xl hover:bg-gray-100 hover:cursor-pointer duration-300 ease-out flex items-center ${pathname === item.href && "shadow-lg shadow-blue-300 border"}`}>
                                <item.icon className={`size-5 ${!isCollapse && "mr-3"}`} />
                                {!isCollapse && item.label}
                            </Link>
                        })}
                    </nav>
                    {/* Control Settings */}
                    <div className={`flex flex-col font-medium text-gray-800 border-t border-gray-200 ${isCollapse ? "pt-4" : "pt-8"} pb-1`}>
                        <Link
                            href="#"
                            className={`my-1 ${isCollapse ? "px-2.5" : "px-4"} py-2 rounded-xl hover:bg-red-500 hover:text-white hover:cursor-pointer border border-gray-200 duration-300 ease-out flex justify-center items-center`}>
                            <LogOutIcon className={`size-5 ${!isCollapse && "mr-3"}`} />
                            {!isCollapse && "Logout"}
                        </Link>
                        {/* <BtnLogout /> */}
                    </div>
                </nav>
            </aside>
        </>
    );
};