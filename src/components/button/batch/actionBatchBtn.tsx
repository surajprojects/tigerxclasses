"use client"

import { useState } from "react";
import DeleteBtn from "../deleteBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BatchData } from "@/utils/types/batchType";
import EditBatch from "@/components/batch/editBatch";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { BatchFormInputEdit } from "@/utils/validators/batchInput";

export default function ActionBatchBtn({ batchData }: { batchData: BatchData }) {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleEditSubmit = async (formData: BatchFormInputEdit) => {
        try {
            await axiosProtected.patch(`/batch/${batchData.id}`, formData);
            toast.success("Batch updated successfully!!!");
            setShowForm(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosProtected.delete(`/batch/${batchData.id}`);
            toast.success("Batch deleted successfully!!!");
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
            {showForm && <EditBatch batchData={batchData} handleEditSubmit={handleEditSubmit} setShowForm={setShowForm} />}
        </>
    );
};