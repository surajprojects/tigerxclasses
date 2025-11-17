"use client"

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import NewDocument from "@/components/students/document/newDocument";

export default function AddDocumentBtn() {
    const [showDocumentForm, setShowDocumentForm] = useState<boolean>(false);
    return (
        <>
            <button
                type="button"
                onClick={() => setShowDocumentForm(true)}
                className="text-white bg-blue-500 rounded-xl px-4 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-400 h-fit w-fit flex items-center justify-center"
            >
                <PlusIcon className="size-5 mr-2" />
                Add Document
            </button>
            {showDocumentForm && <NewDocument setShowForm={setShowDocumentForm} />}
        </>
    );
};