"use client"

import { useState } from "react";
import DeleteBtn from "../deleteBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CourseData } from "@/utils/types/courseType";
import EditCourse from "@/components/course/editCourse";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CourseFormInputEdit } from "@/utils/validators/courseInput";

export default function ActionCourseBtn({ courseData }: { courseData: CourseData }) {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleEditSubmit = async (formData: CourseFormInputEdit) => {
        try {
            await axiosProtected.patch(`/course/${courseData.id}`, formData);
            toast.success("Course updated successfully!!!");
            setShowForm(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosProtected.delete(`/course/${courseData.id}`);
            toast.success("Course deleted successfully!!!");
            setShowForm(false);
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
                    onClick={() => setShowForm(true)}
                    className="hover:bg-blue-500 hover:text-white p-1.5 rounded-xl cursor-pointer duration-300 ease-out outline-none mx-1"
                >
                    <PencilSquareIcon className="size-5" />
                </button>
                <DeleteBtn handleDelete={handleDelete} />
            </div>
            {showForm && <EditCourse courseData={courseData} handleEditSubmit={handleEditSubmit} setShowForm={setShowForm} />}
        </>
    );
};