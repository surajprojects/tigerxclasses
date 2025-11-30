"use client"

import UserForm from "./userForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axiosPublic from "@/utils/axios/axiosPublic";
import { errorHandle } from "@/utils/errors/errorHandle";
import { UserRegisterData } from "@/utils/types/userType";
import { UserFormInput } from "@/utils/validators/userInput";

export default function UserNewForm() {
    const router = useRouter();
    const handleSubmit = async (formData: UserFormInput) => {
        try {
            const result = await axiosPublic.post("/auth/register", formData);
            const data: { message: string, userData: UserRegisterData } = result.data;
            toast.success("User created successfully!!!");
            router.push(`/users/${data.userData.id}/profile`);
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };
    return (
        <>
            <UserForm />
        </>
    );
};