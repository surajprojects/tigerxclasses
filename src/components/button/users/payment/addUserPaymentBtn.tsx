"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { PaymentFormInput } from "@/utils/validators/paymentInput";
import AddPayment from "@/components/students/payments/addPayment";

export default function AddUserPaymentBtn({
    userId,
    subscriptionId,
}: {
    userId: string,
    subscriptionId: string,
}) {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleSubmit = async (formData: PaymentFormInput) => {
        try {
            await axiosProtected.post(`/users/${userId}/subscription/${subscriptionId}/payment`, formData);
            toast.success("Payment added successfully!!!");
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
                className="text-green-500 hover:bg-gray-200/70 p-1.5 rounded-xl cursor-pointer duration-300 ease-out outline-none">
                <CurrencyRupeeIcon className="size-5" />
            </button>
            {showForm && <AddPayment
                setShowForm={setShowForm}
                handleSubmit={handleSubmit}
                studentSummaryCard={false}
            />}
        </>
    );
};