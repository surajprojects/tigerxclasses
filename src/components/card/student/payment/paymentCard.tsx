import clsx from "clsx";
import DeleteBtn from "@/components/button/deleteBtn";
import { CalendarDays, IndianRupee } from "lucide-react";

export default function PaymentCard({
    amount = 5000,
    date = "2025-01-01",
    paymentMethod = "UPI",
    remarks,
    handleDelete,
}: {
    amount?: number,
    paymentMethod?: string,
    date?: string,
    remarks?: string,
    handleDelete?: () => Promise<void>,
}) {
    return (
        <>
            <div className="border border-gray-200 rounded-xl p-4 py-5 flex items-center justify-between hover:bg-gray-100/70">
                <div className="flex items-center">
                    <div className="bg-cyan-100/60 rounded-lg text-blue-500 p-2.5">
                        <IndianRupee className="size-4" />
                    </div>
                    <div className="mx-3">
                        <p className="font-semibold text-lg flex items-center">
                            &#8377;{amount}
                            <span className={clsx("mx-2 font-medium text-sm rounded-xl px-2", paymentMethod === "UPI" ? "text-blue-800 bg-blue-100" : paymentMethod === "CASH" ? "text-green-800 bg-green-100" : paymentMethod === "PHONEPAY" ? "text-purple-800 bg-purple-100" : paymentMethod === "GOOGLEPAY" ? "text-cyan-800 bg-cyan-100" : "")}>
                                {paymentMethod}
                            </span>
                        </p>
                        <div className="flex">
                            <p className="text-gray-500 text-sm flex items-center">
                                <CalendarDays className="size-3.5 mr-1" strokeWidth={1.5} />
                                {date}
                            </p>
                            {remarks && <p className="text-gray-400 italic mx-4 text-sm">{remarks}</p>}
                        </div>
                    </div>
                </div>
                <DeleteBtn handleDelete={handleDelete} />
            </div>
        </>
    );
};