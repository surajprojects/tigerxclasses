"use client"

import { toast } from "react-toastify";
import StudentForm from "./studentForm";
import { useRouter } from "next/navigation";
import { StudentData } from "@/utils/types/studentType";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { StudentFormInput } from "@/utils/validators/studentInput";

export default function StudentNewForm() {
    const router = useRouter();
    const handleSubmit = async (formData: StudentFormInput) => {
        try {
            const result = await axiosProtected.post("/students", formData);
            const data: { message: string, studentData: StudentData } = result.data;
            toast.success("Student created successfully!!!");
            router.push(`/students/${data.studentData.id}/profile`);
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };
    return (
        <>
            <StudentForm handleSubmit={handleSubmit} />
        </>
    );
};