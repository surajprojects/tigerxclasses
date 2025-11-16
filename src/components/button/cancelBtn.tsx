"use client"

import { useRouter } from "next/navigation";

export default function CancelBtn() {
    const router = useRouter();
    return (
        <>
            <button
                type="button"
                onClick={() => {
                    router.back();
                }}
                className="font-sans text-black hover:text-white text-sm font-semibold px-3 py-2 rounded-xl cursor-pointer outline-none mx-3 border border-gray-300 hover:bg-red-500 duration-300 ease-out"
            >
                Cancel
            </button>
        </>
    );
};