import { DocumentTextIcon } from "@heroicons/react/24/outline";
import ViewDocument from "../../students/document/viewDocument";
import { StudentDocumentData } from "@/utils/types/studentDocumentType";
import ActionDocumentBtn from "@/components/button/student/document/actionDocumentBtn";

export default function DocumentCard({
    showDocForm,
    onToggle,
    studentDocumentData,
    studentId,
}: {
    showDocForm: boolean,
    onToggle: () => void,
    studentDocumentData: StudentDocumentData,
    studentId: string,
}) {
    return (
        <>
            <div className="border border-gray-200 w-full rounded-xl p-4 flex justify-between items-center hover:bg-gray-100 shadow-xs mt-5">
                <div className="flex items-center">
                    <div className="mr-4 bg-blue-100 p-2.5 rounded-2xl text-blue-500">
                        <DocumentTextIcon className="size-5" strokeWidth={1.8} />
                    </div>
                    <div>
                        <p onClick={onToggle} className="font-semibold cursor-pointer capitalize">{studentDocumentData.documentType.toLowerCase()}</p>
                        <p className="text-xs text-gray-500 mt-1">{studentDocumentData.createdAt.split("T")[0]}</p>
                    </div>
                </div>
                <ActionDocumentBtn
                    studentId={studentId}
                    documentId={studentDocumentData.id}
                    studentDocumentData={studentDocumentData}
                />
            </div>
            {showDocForm && <ViewDocument studentDocumentData={studentDocumentData} />}
        </>
    );
};