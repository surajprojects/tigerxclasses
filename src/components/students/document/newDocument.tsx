import DocumentForm from "./documentForm";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StudentDocumentInput } from "@/utils/validators/studentDocumentInput";

export default function NewDocument({
    setShowForm,
    handleSubmit,
}: {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    handleSubmit: (data: StudentDocumentInput) => Promise<void>,
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
                        <h5 className="text-2xl font-medium text-gray-800">Add Document</h5>
                        <p className="text-gray-600 text-base my-1">Fill in the details to add a document</p>
                        <DocumentForm btnText="Add Document" handleSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    );
};