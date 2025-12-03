"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { UserSubscriptionInput } from "@/utils/validators/userSubscriptionInput";
import NewUserSubscription from "@/components/users/userSubscription/newUserSubscription";

export default function AddUserSubscriptionBtn({ userId = "1" }: { userId?: string }) {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleSubmit = async (formData: UserSubscriptionInput) => {
        try {
            await axiosProtected.post(`/users/${userId}/subscription`, formData);
            toast.success("Subscription created successfully!!!");
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
                className="text-white bg-blue-500 rounded-xl px-3 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-500/90 h-fit w-fit flex items-center justify-center text-sm"
            >
                <PlusIcon className="size-4 mr-2" />
                Add Subscription
            </button>
            {showForm && <NewUserSubscription setShowForm={setShowForm} handleSubmit={handleSubmit} />}
        </>
    );
};  