"use client"

import { useState } from "react";
import DeleteBtn from "../deleteBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { SubscriptionData } from "@/utils/types/subscriptionType";
import { UserSubscriptionInputEdit } from "@/utils/validators/userSubscriptionInput";
import EditUserSubscription from "@/components/users/userSubscription/editUserSubscription";

export default function ActionUserSubscriptionBtn({
    userId,
    subscriptionData,
}: {
    userId: string,
    subscriptionData: SubscriptionData,
}) {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleEditSubmit = async (formData: UserSubscriptionInputEdit) => {
        try {
            await axiosProtected.patch(`/users/${userId}/subscription/${subscriptionData.id}`, formData);
            toast.success("Subscription updated successfully!!!");
            setShowForm(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axiosProtected.delete(`/users/${userId}/subscription/${subscriptionData.id}`);
            toast.success("Subscription deleted successfully!!!");
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
            {showForm && <EditUserSubscription
                setShowForm={setShowForm}
                handleEditSubmit={handleEditSubmit}
                userSubscriptionData={{
                    name: subscriptionData.name,
                    plan: subscriptionData.plan,
                    amount: String(subscriptionData.amount),
                    startedOn: subscriptionData.startedOn,
                    expiresOn: subscriptionData.expiresOn,
                    remarks: subscriptionData.remarks ? subscriptionData.remarks : "",
                }}
            />
            }
        </>
    );
};