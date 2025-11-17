"use client"

import { useState } from "react";
import DownloadBtn from "../button/downloadBtn";
import ViewDocument from "../students/document/viewDocument";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export default function DocumentCard() {
    const [showDocForm, setShowDocForm] = useState<boolean>(false);
    return (
        <>
            <div className="border border-gray-200 w-full rounded-xl p-4 flex justify-between items-center hover:bg-gray-100 shadow-xs mt-5">
                <div className="flex items-center">
                    <div className="mr-4 bg-blue-100 p-2.5 rounded-2xl text-blue-500">
                        <DocumentTextIcon className="size-5" strokeWidth={1.8} />
                    </div>
                    <div>
                        <p onClick={() => setShowDocForm((prevData) => !prevData)} className="font-semibold cursor-pointer">Aadhaar</p>
                        <p className="text-xs text-gray-500 mt-1">2025-01-01</p>
                    </div>
                </div>
                <DownloadBtn />
            </div>
            {showDocForm && <ViewDocument />}
        </>
    );
};