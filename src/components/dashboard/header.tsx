"use client"

import { usePathname } from "next/navigation";

export default function Header({
    profileImg = "avatar.png",
}: {
    profileImg?: string,
}) {
    const pathname = usePathname();
    return (
        <>
            <header className="w-full h-16 px-8 flex justify-between items-center font-medium text-gray-700 border-b border-gray-200 shadow-sm sticky top-0 bg-white z-10">
                <p className="capitalize">{pathname.split("/")[1]}</p>
                <div className="size-8 rounded-full overflow-hidden border border-gray-400/80 shadow-sm">
                    <img
                        src={profileImg}
                        alt="profile image"
                        className="w-full h-full object-cover"
                    />
                </div>
            </header>
        </>
    );
};