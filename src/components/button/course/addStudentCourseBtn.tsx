"use client"

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddStudentCourse from "@/components/course/addStudentCourse";

export default function AddStudentCourseBtn({ studentId }: { studentId: string }) {
    const [showCourseForm, setShowCourseForm] = useState<boolean>(false);
    return (
        <>
            <button
                type="button"
                onClick={() => setShowCourseForm(true)}
                className="text-white bg-blue-500 rounded-xl px-4 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-400 h-fit w-fit flex items-center justify-center"
            >
                <PlusIcon className="size-5 mr-2" />
                Add Course
            </button>
            {showCourseForm && <AddStudentCourse setShowForm={setShowCourseForm} studentId={studentId} />}
        </>
    );
};