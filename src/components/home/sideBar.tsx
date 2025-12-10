"use client"

import Link from "next/link";
import { useState } from "react";
import BtnLogout from "../button/btnLogout";
import { usePathname } from "next/navigation";
import { UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import { DollarSign, ChartColumn, PanelLeft, Notebook, BookOpenText, Users } from "lucide-react";
import clsx from "clsx";

export default function SideBar({ isAdmin = false }: { isAdmin?: boolean }) {
    const pathname = usePathname();
    const [isCollapse, setIsCollapse] = useState(false);
    const nav = [
        { label: "Dashboard", icon: ChartColumn, href: "/dashboard" },
        { label: "Users", icon: Users, href: "/users" },
        { label: "Students", icon: UsersIcon, href: "/students" },
        { label: "Batch", icon: Notebook, href: "/batch" },
        { label: "Course", icon: BookOpenText, href: "/course" },
        { label: "Payments", icon: DollarSign, href: "/payments" },
    ];
    return (
        <>
            <aside className="bg-white h-full p-3 flex flex-col border-r border-gray-200 duration-300 ease-in-out">
                {/* Title Container */}
                <div className={clsx("flex justify-between items-center border-b border-gray-200", isCollapse ? "flex-col pb-1.5 mt-1.5" : "mt-2 pb-3")}>
                    {!isCollapse && <Link href="/" className="ml-1 text-2xl font-bold hover:cursor-pointer text-blue-500">Tiger Classes</Link>}
                    <button
                        type="button"
                        onClick={() => setIsCollapse((prevData) => !prevData)}
                        className={clsx("hover:bg-gray-100 p-1.5 rounded-xl cursor-pointer duration-300 ease-out outline-none", !isCollapse && "ml-3")}
                    >
                        <PanelLeft className="size-5" />
                    </button>
                </div>
                {/* Wrapper Container */}
                <nav className="mt-2 grow flex flex-col justify-between">
                    {/* Navigation Routes */}
                    <nav className="flex flex-col font-medium text-gray-800">
                        {nav.map((item, idx) => {
                            if (!isAdmin && item.label === "Users") {
                                return
                            }
                            return <Link
                                key={idx}
                                href={item.href}
                                className={`my-1.5 ${isCollapse ? "px-2.5" : "px-5"} py-2 border-gray-200 outline-none rounded-xl hover:bg-gray-100 cursor-pointer duration-300 ease-out flex items-center ${((pathname === item.href) || (pathname.startsWith(`${item.href}/`))) && "shadow-lg shadow-blue-300 border hover:bg-white"}`}>
                                <item.icon className={`size-5 ${!isCollapse && "mr-3"}`} strokeWidth={2} />
                                {!isCollapse && item.label}
                            </Link>
                        })}
                    </nav>
                    {/* Control Settings */}
                    <div className={`flex flex-col font-medium text-gray-800 border-t border-gray-200 ${isCollapse ? "pt-2.5" : "pt-4"} pb-1.5`}>
                        <Link
                            href="/profile"
                            className={`mb-1.5 ${isCollapse ? "px-2.5" : "px-5"} py-2 border border-gray-100 outline-none rounded-xl hover:bg-gray-100 cursor-pointer duration-300 ease-out flex justify-center items-center`}>
                            <UserIcon className={`size-5 ${!isCollapse && "mr-3"}`} strokeWidth={2} />
                            {!isCollapse && "Profile"}
                        </Link>
                        <BtnLogout isCollapse={isCollapse} />
                    </div>
                </nav>
            </aside >
        </>
    );
};