"use client"

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackBtn() {
    const router = useRouter();
    return (
        <>
            <button
                type="button"
                onClick={() => {
                    router.back();
                }}
                className="font-medium flex items-center hover:bg-gray-200 px-3 py-1 rounded-lg duration-300 ease-out cursor-pointer"
            >
                <ArrowLeftIcon className="size-3.5 mr-1" />
                Back
            </button>
        </>
    );
};