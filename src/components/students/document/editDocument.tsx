import DocumentForm from "./documentForm";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StudentDocumentData } from "@/utils/types/studentDocumentType";
import { StudentCourseInputEdit } from "@/utils/validators/studentCourseInput";

export default function EditDocument({
    setShowForm,
    handleEditSubmit,
    studentDocumentData,
}: {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    handleEditSubmit?: (data: StudentCourseInputEdit) => Promise<void>,
    studentDocumentData: StudentDocumentData,
}) {
    const handleCloseForm = () => {
        setShowForm(false);
    };
    return (
        <>
            <div onClick={handleCloseForm} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div onClick={(evt) => evt.stopPropagation()} className="bg-white p-6 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-none">
                    <button
                        type="button"
                        onClick={handleCloseForm}
                        className="absolute top-2 right-2 m-0.5 hover:bg-gray-100 duration-300 ease-out cursor-pointer rounded-xl p-0.5"
                    >
                        <XMarkIcon className="size-4" />
                    </button>
                    <div className="w-xl">
                        <h5 className="text-2xl font-medium text-gray-800">Edit Document</h5>
                        <p className="text-gray-600 text-base my-1">Update document details</p>
                        <DocumentForm
                            btnText="Update Document"
                            handleEditSubmit={handleEditSubmit}
                            initialData={{
                                documentType: studentDocumentData.documentType,
                                documentName: studentDocumentData.documentName ? studentDocumentData.documentName : "",
                                institute: studentDocumentData.institute,
                                instituteName: studentDocumentData.instituteName ? studentDocumentData.instituteName : "",
                                idNo: studentDocumentData.idNo ? studentDocumentData.idNo : "",
                                aadhaarNo: studentDocumentData.aadhaarNo ? studentDocumentData.aadhaarNo : "",
                                enrollmentNo: studentDocumentData.enrollmentNo ? studentDocumentData.enrollmentNo : "",
                                obtainedMarks: studentDocumentData.obtainedMarks ? studentDocumentData.obtainedMarks : 0,
                                totalMarks: studentDocumentData.totalMarks ? studentDocumentData.totalMarks : 0,
                                rollNo: studentDocumentData.rollNo ? studentDocumentData.rollNo : "",
                                session: studentDocumentData.session ? studentDocumentData.session : "",
                                documentLink: studentDocumentData.documentLink ? studentDocumentData.documentLink : "",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};