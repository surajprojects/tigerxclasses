import BatchForm from "./batchForm";
import { BatchData } from "@/utils/types/batchType";
import { BatchFormInputEdit } from "@/utils/validators/batchInput";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function EditBatch({
    setShowForm,
    batchData,
    handleEditSubmit,
}: {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    batchData: BatchData,
    handleEditSubmit: (data: BatchFormInputEdit) => Promise<void>,
}) {
    const handleCloseForm = () => {
        setShowForm(false);
    };
    return (
        <>
            <div onClick={handleCloseForm} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div onClick={(evt) => evt.stopPropagation()} className="bg-white p-6 rounded-xl shadow-lg relative">
                    <button
                        type="button"
                        onClick={handleCloseForm}
                        className="absolute top-2 right-2 m-0.5 hover:bg-gray-100 duration-300 ease-out cursor-pointer rounded-xl p-0.5"
                    >
                        <XMarkIcon className="size-4" />
                    </button>
                    <div className="w-md max-w-lg">
                        <h5 className="text-lg font-medium text-gray-800">Edit Batch</h5>
                        <p className="text-gray-600 text-base my-1">Update batch information</p>
                        <BatchForm
                            initialData={{
                                name: batchData.name,
                                description: batchData.description,
                                code: batchData.code,
                                time: batchData.time,
                                startDate: batchData.startDate.split("T")[0],
                                endDate: batchData.endDate.split("T")[0],
                            }}
                            btnText="Update Batch"
                            handleEditSubmit={handleEditSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};