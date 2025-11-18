"use client"

import { useState } from "react";
import DeleteBtn from "../deleteBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { StudentCourseData } from "@/utils/types/studentCourseType";
import EditStudentCourse from "@/components/course/editStudentCourse";
import { StudentCourseInputEdit } from "@/utils/validators/studentCourseInput";

export default function ActionStudentCourseBtn({
    studentId,
    studentCourseData,
}: {
    studentId: string,
    studentCourseData: StudentCourseData,
}) {
    const router = useRouter();
    const [showStudentCourseForm, setShowStudentCourseForm] = useState<boolean>(false);

    const handleEditSubmit = async (formData: StudentCourseInputEdit) => {
        try {
            await axiosProtected.patch(`/students/${studentId}/studentcourse/${studentCourseData.id}`, formData);
            toast.success("Student Course updated successfully!!!");
            setShowStudentCourseForm(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosProtected.delete(`/students/${studentId}/studentcourse/${studentCourseData.id}`);
            toast.success("Student Course deleted successfully!!!");
            setShowStudentCourseForm(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={() => setShowStudentCourseForm(true)}
                    className="hover:bg-blue-500 hover:text-white p-1.5 rounded-xl cursor-pointer duration-300 ease-out outline-none mx-1"
                >
                    <PencilSquareIcon className="size-5" />
                </button>
                <DeleteBtn handleDelete={handleDelete} />
            </div>
            {showStudentCourseForm &&
                <EditStudentCourse
                    setShowForm={setShowStudentCourseForm}
                    handleEditSubmit={handleEditSubmit}
                    studentCourseData={studentCourseData}
                />
            }
        </>
    );
};