"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NewBatch from "@/components/batch/newBatch";
import { PlusIcon } from "@heroicons/react/24/outline";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { BatchFormInput } from "@/utils/validators/batchInput";

export default function AddBatchBtn() {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleSubmit = async (formData: BatchFormInput) => {
        try {
            await axiosProtected.post("/batch", formData);
            toast.success("Batch created successfully!!!");
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
                className="text-white bg-blue-500 rounded-xl px-4 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-400 h-fit w-fit flex items-center justify-center"
            >
                <PlusIcon className="size-5 mr-2" />
                Add Batch
            </button>
            {showForm && <NewBatch setShowForm={setShowForm} handleSubmit={handleSubmit} />}
        </>
    );
};  