"use client"

import { useState } from "react";
import NewBatch from "@/components/batch/newBatch";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddBatchBtn() {
    const [showForm, setShowForm] = useState<boolean>(false);
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
            {showForm && <NewBatch setShowForm={setShowForm} />}
        </>
    );
};  