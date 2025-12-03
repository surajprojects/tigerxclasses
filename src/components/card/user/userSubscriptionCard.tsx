import { SubscriptionData } from "@/utils/types/subscriptionType";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import ActionUserSubscriptionBtn from "@/components/button/users/actionUserSubscriptionBtn";
import AddUserPaymentBtn from "@/components/button/users/payment/addUserPaymentBtn";
import ViewUserPaymentsBtn from "@/components/button/users/payment/viewUserPaymentsBtn";

export default function UserSubscriptionCard({
    userId,
    userSubscriptionData,
}: {
    userId: string,
    userSubscriptionData: SubscriptionData,
}) {
    return (
        <>
            <div className="w-full p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-[#f8fafc] font-normal duration-300 ease-out">
                <div className="flex justify-between">
                    <div>
                        <p className="text-lg font-medium text-gray-800">{userSubscriptionData.name}</p>
                        <p className="text-base text-gray-600">{userSubscriptionData.plan}</p>
                    </div>
                    <ActionUserSubscriptionBtn userId={userId} subscriptionData={userSubscriptionData} />
                </div>
                <div className="my-5 flex justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Amount</p>
                        <p className="text-base font-medium text-gray-800">{userSubscriptionData.amount}</p>
                    </div>
                    <AddUserPaymentBtn userId={userId} subscriptionId={userSubscriptionData.id} />
                </div>
                <div className="flex">
                    <div>
                        <p className="text-sm text-gray-600 flex items-center"><CalendarDateRangeIcon className="size-3.5 mr-1" />Start Date</p>
                        <p className="text-base font-medium text-gray-800">{userSubscriptionData.startedOn.split("T")[0]}</p>
                    </div>
                    <div className="mx-auto">
                        <p className="text-sm text-gray-600 flex items-center"><CalendarDateRangeIcon className="size-3.5 mr-1" />End Date</p>
                        <p className="text-base font-medium text-gray-800">{userSubscriptionData.expiresOn.split("T")[0]}</p>
                    </div>
                </div>
                <ViewUserPaymentsBtn userId={userId} subscriptionId={userSubscriptionData.id} paymentsList={userSubscriptionData.payments} />
                <div className="pt-3.5 mt-3.5 border-t border-gray-200 flex items-center">
                    <p className="text-base font-medium text-gray-800">{userSubscriptionData.remarks}</p>
                </div>
            </div>
        </>
    );
};