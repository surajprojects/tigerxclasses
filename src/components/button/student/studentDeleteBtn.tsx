"use client"

import DeleteBtn from "../deleteBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";

export default function StudentDeleteBtn({ studentId }: { studentId: string }) {
    const router = useRouter();
    const handleDelete = async () => {
        try {
            await axiosProtected.delete(`/students/${studentId}`);
            toast.success("Student deleted successfully!!!");
            router.push("/students");
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