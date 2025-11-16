"use client"

import { toast } from "react-toastify";
import BackBtn from "@/components/button/backBtn";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import StudentForm from "@/components/students/studentForm";
import { StudentFormInput } from "@/utils/validators/studentInput";

export default function NewStudent() {
    const handleSubmit = async (formData: StudentFormInput) => {
        try {
            await axiosProtected.post("/students", formData);
            toast.success("Student created successfully!!!");
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };
    return (
        <>
            <div>
                <div className="flex items-center">
                    <BackBtn />
                    <div className="mx-5">
                        <h4 className="text-gray-800 font-bold text-3xl">Add New Student</h4>
                        <p className="text-gray-500 text-lg">Fill in the details to add a new student</p>
                    </div>
                </div>
                <StudentForm handleSubmit={handleSubmit} />
            </div>
        </>
    );
};