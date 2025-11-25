export default function PaymentSummaryCard({
    totalPaid = 10000,
    totalPayments = 2,
}: {
    totalPaid?: number,
    totalPayments?: number,
}) {
    return (
        <>
            <div className="bg-cyan-50 rounded-2xl shadow p-5 pt-10 flex justify-between">
                <div>
                    <p className="text-gray-600">Total Paid</p>
                    <p className="text-blue-500/90 font-bold text-3xl">&#8377;{totalPaid}</p>
                </div>
                <div>
                    <p className="text-gray-600">Total Transactions</p>
                    <p className="text-right font-bold text-3xl">{totalPayments}</p>
                </div>
            </div>
        </>
    );
};