"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NewCourse from "@/components/course/newCourse";
import { PlusIcon } from "@heroicons/react/24/outline";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { CourseFormInput } from "@/utils/validators/courseInput";

export default function AddCourseBtn() {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleSubmit = async (formData: CourseFormInput) => {
        try {
            await axiosProtected.post("/course", formData);
            toast.success("Course created successfully!!!");
            setShowForm(false);
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
                onClick={() => setShowForm(true)}
                className="text-white bg-blue-500 rounded-xl px-3 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-500/90 h-fit w-fit flex items-center justify-center text-sm"
            >
                <PlusIcon className="size-5 mr-2" />
                Add Course
            </button>
            {showForm && <NewCourse setShowForm={setShowForm} handleSubmit={handleSubmit} />}
        </>
    );
};  