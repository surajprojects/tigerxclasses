"use client"

import { usePathname } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const pathname = usePathname();
    return (
        <>
            <header className="w-full h-16 px-8 flex justify-between items-center font-medium text-gray-700 border-b border-gray-200 shadow-sm sticky top-0 bg-white z-10">
                <div>
                    <p className="capitalize">{pathname.split("/")[1]}</p>
                </div>
                <ul className="flex items-center">
                    <li className="mx-2 cursor-pointer hover:bg-gray-100 duration-300 ease-out p-1.5 rounded-xl">
                        <UserIcon className="size-5" />
                    </li>
                </ul>
            </header>
        </>
    );
};