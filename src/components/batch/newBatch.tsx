import BatchForm from "./batchForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { BatchFormInput } from "@/utils/validators/batchInput";

export default function NewBatch({ setShowForm }: { setShowForm: React.Dispatch<React.SetStateAction<boolean>> }) {
    const router = useRouter();
    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleSubmit = async (formData: BatchFormInput) => {
        try {
            await axiosProtected.post("/batch", formData);
            toast.success("Batch created successfully!!!");
            handleCloseForm();
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
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
                    <div className="w-md">
                        <h5 className="text-lg font-medium text-gray-800">Add Batch</h5>
                        <p className="text-gray-600 text-base my-1">Fill in the details to create a new batch</p>
                        <BatchForm
                            btnText="Add Batch"
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};