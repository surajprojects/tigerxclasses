import { PaymentsList } from "@/utils/types/paymentType";
import PaymentCard from "@/components/card/student/payment/paymentCard";
import PaymentSummaryCard from "@/components/card/student/payment/paymentSummaryCard";

export default function ViewPayments({
    paymentsList,
    handleDelete,
}: {
    paymentsList: PaymentsList,
    handleDelete: (id: string) => Promise<void>,
}) {
    return (
        <>
            <div className="text-gray-900">
                {/* Title */}
                <h4 className="text-2xl font-medium">Tally</h4>
                {/* Description */}
                <p className="text-gray-500 my-2 mb-4">Payment history and transaction details</p>
                {/* Payment Summary Card */}
                <PaymentSummaryCard
                    totalPaid={paymentsList.reduce((sum, payment) => payment.amount + sum, 0)}
                    totalPayments={paymentsList.length}
                />
                {/* Payment Cards */}
                <div className="mt-4 grid grid-cols-1 gap-4">
                    {paymentsList.length > 0 && paymentsList.map((payment) => {
                        const handlePaymentDelete = () => handleDelete(payment.id);
                        return <PaymentCard
                            key={payment.id}
                            amount={payment.amount}
                            date={payment.date.split("T")[0]}
                            paymentMethod={payment.method}
                            remarks={payment.remarks}
                            handleDelete={handlePaymentDelete}
                        />
                    })}
                </div>
            </div>
        </>
    );
};