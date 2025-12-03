"use client"

import DeleteBtn from "../deleteBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";

export default function UserDeleteBtn({ userId = "1" }: { userId?: string }) {
    const router = useRouter();
    const handleDelete = async () => {
        try {
            await axiosProtected.delete(`/users/${userId}`);
            toast.success("User deleted successfully!!!");
            router.push("/users");
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };
    return (
        <>
            <DeleteBtn handleDelete={handleDelete} />
        </>
    );
};