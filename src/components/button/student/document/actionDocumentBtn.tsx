import { useState } from "react";
import { toast } from "react-toastify";
import DeleteBtn from "../../deleteBtn";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import EditDocument from "@/components/students/document/editDocument";
import { StudentDocumentData } from "@/utils/types/studentDocumentType";
import { StudentDocumentInputEdit } from "@/utils/validators/studentDocumentInput";

export default function ActionDocumentBtn({
    studentId,
    documentId,
    studentDocumentData
}: {
    studentId: string,
    documentId: string,
    studentDocumentData: StudentDocumentData,
}) {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleEditSubmit = async (formData: StudentDocumentInputEdit) => {
        try {
            await axiosProtected.patch(`/students/${studentId}/studentdocument/${documentId}`, formData);
            toast.success("Student Document updated successfully!!!");
            setShowForm(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosProtected.delete(`/students/${studentId}/studentdocument/${documentId}`);
            toast.success("Student Document deleted successfully!!!");
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
                    className="text-blue-500 hover:bg-gray-200/70 p-1.5 rounded-xl cursor-pointer duration-300 ease-out outline-none mx-1"
                >
                    <PencilSquareIcon className="size-5" />
                </button>
                <DeleteBtn handleDelete={handleDelete} />
            </div>
            {showForm && <EditDocument
                setShowForm={setShowForm}
                handleEditSubmit={handleEditSubmit}
                studentDocumentData={studentDocumentData}
            />}
        </>
    );
};