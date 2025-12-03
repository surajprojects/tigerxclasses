import { XMarkIcon } from "@heroicons/react/24/outline";
import UserSubscriptionForm from "./userSubscriptionForm";
import { UserSubscriptionFormData } from "@/utils/types/subscriptionType";
import { UserSubscriptionInputEdit } from "@/utils/validators/userSubscriptionInput";

export default function EditUserSubscription({
    setShowForm,
    userSubscriptionData,
    handleEditSubmit,
}: {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    userSubscriptionData: UserSubscriptionFormData,
    handleEditSubmit: (data: UserSubscriptionInputEdit) => Promise<void>,
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
                        <h5 className="text-lg font-medium text-gray-800">Edit Subscription</h5>
                        <p className="text-gray-600 text-base my-1">Update subscription information</p>
                        <UserSubscriptionForm
                            initialData={{
                                name: userSubscriptionData.name,
                                plan: userSubscriptionData.plan,
                                amount: userSubscriptionData.amount,
                                startedOn: userSubscriptionData.startedOn.split("T")[0],
                                expiresOn: userSubscriptionData.expiresOn.split("T")[0],
                                remarks: userSubscriptionData.remarks,
                            }}
                            btnText="Update Subscription"
                            handleEditSubmit={handleEditSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};