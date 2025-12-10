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
            </header>
        </>
    );
};