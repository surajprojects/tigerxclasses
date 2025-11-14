import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

export default function BtnLogout({ isCollapse }: { isCollapse: boolean }) {
    return (
        <>
            <button
                type="button"
                onClick={() => signOut()}
                className={`my-1 ${isCollapse ? "px-2.5" : "px-4"} py-2 rounded-xl hover:bg-red-500 hover:text-white hover:cursor-pointer border border-gray-200 duration-300 ease-out flex justify-center items-center`}>
                <LogOutIcon className={`size-5 ${!isCollapse && "mr-3"}`} />
                {!isCollapse && "Logout"}
            </button>
        </>
    );
};
