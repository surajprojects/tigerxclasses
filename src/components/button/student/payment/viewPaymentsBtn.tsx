"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PaymentsList } from "@/utils/types/paymentType";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import ViewPayments from "@/components/students/payments/viewPayments";

export default function ViewPaymentsBtn({
    studentId,
    studentCourseId,
    paymentsList,
}: {
    studentId: string,
    studentCourseId: string,
    paymentsList: PaymentsList,
}) {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleDelete = async (paymentId: string) => {
        try {
            await axiosProtected.delete(`/students/${studentId}/studentcourse/${studentCourseId}/payment/${paymentId}`);
            toast.success("Payment deleted successfully!!!");
            setShowForm(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setShowForm(true)}
                className="text-gray-800 border border-gray-200 w-full text-center rounded-xl py-1.5 text-sm font-medium mt-2.5 cursor-pointer hover:bg-gray-200/60 duration-300 ease-out">
                View Payments &#40;{paymentsList.length}&#41;
            </button>
            {showForm &&
                <div onClick={handleCloseForm} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div onClick={(evt) => evt.stopPropagation()} className="bg-white p-6 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-none">
                        <button
                            type="button"
                            onClick={handleCloseForm}
                            className="absolute top-2 right-2 m-0.5 hover:bg-gray-100 duration-300 ease-out cursor-pointer rounded-xl p-0.5 text-gray-500"
                        >
                            <XMarkIcon className="size-4" />
                        </button>
                        <div className="w-md">
                            <ViewPayments paymentsList={paymentsList} handleDelete={handleDelete} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
};