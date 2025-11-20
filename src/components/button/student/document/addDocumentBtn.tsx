"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import NewDocument from "@/components/students/document/newDocument";
import { StudentDocumentInput } from "@/utils/validators/studentDocumentInput";

export default function AddDocumentBtn({ studentId }: { studentId: string }) {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleSubmit = async (formData: StudentDocumentInput) => {
        try {
            await axiosProtected.post(`/students/${studentId}/studentdocument`, formData);
            toast.success("Student Document created successfully!!!");
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
                Add Document
            </button>
            {showForm && <NewDocument setShowForm={setShowForm} handleSubmit={handleSubmit} />}
        </>
    );
};