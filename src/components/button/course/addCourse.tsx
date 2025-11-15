"use client"

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import NewCourse from "@/components/course/newCourse";

export default function AddCourseBtn() {
    const [showForm, setShowForm] = useState<boolean>(false);
    return (
        <>
            <button
                type="button"
                onClick={() => setShowForm(true)}
                className="text-white bg-blue-500 rounded-xl px-4 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-400 h-fit w-fit flex items-center justify-center"
            >
                <PlusIcon className="size-5 mr-2" />
                Add Course
            </button>
            {showForm && <NewCourse setShowForm={setShowForm} />}
        </>
    );
};  