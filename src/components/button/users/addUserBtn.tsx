import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddUserBtn() {
    return (
        <>
            <Link
                href="/users/new"
                className="text-white bg-blue-500 rounded-xl px-3 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-500/90 h-fit w-fit flex items-center justify-center text-sm"
            >
                <PlusIcon className="size-5 mr-2" />
                Add User
            </Link>
        </>
    );
};