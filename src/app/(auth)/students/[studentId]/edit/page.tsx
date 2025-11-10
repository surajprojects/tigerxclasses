"use client"

import StudentForm from "@/components/students/studentForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function EditStudent() {
    return (
        <>
            <div>
                <div className="flex items-center">
                    <div>
                        <button
                            type="button"
                            className="font-medium flex items-center hover:bg-gray-200 px-3 py-1 rounded-lg duration-300 ease-out cursor-pointer"
                        >
                            <ArrowLeftIcon className="size-3.5 mr-1" />
                            Back
                        </button>
                    </div>
                    <div className="mx-5">
                        <h4 className="text-gray-800 font-bold text-3xl">Edit Student</h4>
                        <p className="text-gray-500 text-lg">Update student information</p>
                    </div>
                </div>
                <StudentForm />
            </div>
        </>
    );
};