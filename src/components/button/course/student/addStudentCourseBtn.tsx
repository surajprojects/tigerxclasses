"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { StudentCourseInput } from "@/utils/validators/studentCourseInput";
import NewStudentCourse from "@/components/course/student/newStudentCourse";

export default function AddStudentCourseBtn({ studentId }: { studentId: string }) {
    const router = useRouter();
    const [showStudentCourseForm, setShowStudentCourseForm] = useState<boolean>(false);

    const handleSubmit = async (formData: StudentCourseInput) => {
        try {
            await axiosProtected.post(`/students/${studentId}/studentcourse`, formData);
            toast.success("Student Course created successfully!!!");
            setShowStudentCourseForm(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setShowStudentCourseForm(true)}
                className="text-white bg-blue-500 rounded-xl px-3 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-500/90 h-fit w-fit flex items-center justify-center text-sm"
            >
                <PlusIcon className="size-5 mr-2" />
                Add Course
            </button>
            {showStudentCourseForm && <NewStudentCourse setShowForm={setShowStudentCourseForm} handleSubmit={handleSubmit} />}
        </>
    );
};