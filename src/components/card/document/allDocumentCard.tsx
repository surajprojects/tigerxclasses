"use client"

import { useState } from "react";
import { StudentData } from "@/utils/types/studentType";
import DocumentCard from "@/components/card/document/documentCard";

export default function AllDocumentCard({ studentData, studentId }: { studentData: StudentData, studentId: string }) {
    const [showDocForm, setShowDocForm] = useState<string | null>(null);
    const handleToggle = (id: string) => {
        setShowDocForm(prev => prev === id ? null : id);
    };
    return (
        <>
            <div className="mt-6">
                {studentData.documents.length > 0 && studentData.documents.map((document) => {
                    return <DocumentCard
                        key={document.id}
                        studentDocumentData={document}
                        showDocForm={showDocForm === document.id}
                        onToggle={() => handleToggle(document.id)}
                        studentId={studentId}
                    />;
                })}
            </div>
        </>
    );
};