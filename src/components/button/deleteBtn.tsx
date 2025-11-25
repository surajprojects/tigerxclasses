import Btn from "./btn";
import { useState } from "react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function DeleteBtn({ handleDelete, }: { handleDelete?: () => Promise<void>, }) {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleDeleteFunc = async () => {
        setIsLoading(true);
        setIsBtnDisabled(true);
        handleDelete && await handleDelete();
        setIsLoading(false);
        setIsBtnDisabled(false);
        handleCloseForm();
    };
    return (
        <>
            <button
                type="button"
                onClick={() => setShowForm(true)}
                className="text-red-500 hover:bg-gray-200/70 p-1.5 rounded-xl cursor-pointer duration-300 ease-out outline-none"
            >
                <TrashIcon className="size-5" />
            </button>
            {showForm &&
                <div onClick={handleCloseForm} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div onClick={(evt) => evt.stopPropagation()} className="bg-white p-6 rounded-xl shadow-lg relative">
                        <button
                            type="button"
                            onClick={handleCloseForm}
                            className="absolute top-2 right-2 m-0.5 hover:bg-gray-100 duration-300 ease-out cursor-pointer rounded-xl p-0.5 text-gray-500"
                        >
                            <XMarkIcon className="size-4" />
                        </button>
                        <div className="w-md">
                            <h5 className="text-xl text-center font-medium text-gray-800">Are you sure?</h5>
                            <div className="flex gap-3 mt-6">
                                <Btn
                                    text="Cancel"
                                    handleClick={handleCloseForm}
                                    className="text-black bg-gray-200/70 hover:bg-gray-200 border border-gray-200/50"
                                />
                                <Btn
                                    text="Confirm"
                                    isLoading={isLoading}
                                    btnDisabled={isBtnDisabled}
                                    handleClick={handleDeleteFunc}
                                    className="bg-red-500 hover:bg-red-500/90 text-white"
                                    spinnerClassName="fill-red-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};