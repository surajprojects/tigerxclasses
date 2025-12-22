import Card from "@/components/dashboard/card";
import getPayments from "@/lib/server/getPayments";
import { Calendar, IndianRupeeIcon, TrendingUp } from "lucide-react";
import AllStudentsPaymentWrapper from "@/components/payments/allStudentsPaymentWrapper";

export default async function Payments() {
    const allStudentsData = await getPayments();

    if (!allStudentsData) {
        return (
            <>
                <p className="italic text-gray-500 mt-5">Students not found!!!</p>
            </>
        );
    }

    const totalFees = allStudentsData.allStudents.reduce((sum: any, student: any) => sum + student.totalFees, 0);
    const paidFees = allStudentsData.allStudents.reduce((sum: any, student: any) => sum + student.paidFees, 0);
    return (
        <>
            <div>
                <div>
                    <h6 className="text-4xl text-gray-800 font-bold">Payments</h6>
                    <p className="my-1 text-gray-500 text-lg">Track and manage student payments</p>
                </div>
                <div className="grid grid-cols-4 gap-x-6 my-5">
                    <Card
                        title="Total Received"
                        description="Completed payment"
                        data={`₹${totalFees}`}
                        className="text-orange-500 bg-orange-50/40"
                        titleStyle="text-3xl my-1 mt-3"
                        descriptionStyle="text-gray-500"
                    >
                        <IndianRupeeIcon className="size-4" />
                    </Card>
                    <Card
                        title="Pending Amount"
                        description="Awaiting payment"
                        data={`₹${totalFees - paidFees}`}
                        className="text-cyan-500 bg-cyan-50/40"
                        titleStyle="text-3xl my-1 mt-3"
                        descriptionStyle="text-gray-500"
                    >
                        <Calendar className="size-4" />
                    </Card>
                    <Card
                        title="Payment Rate"
                        description={`${allStudentsData.allStudents ? allStudentsData.allStudents.length : 0} students`}
                        data={`${(Math.floor((100 * paidFees) / totalFees)) ? (Math.floor((100 * paidFees) / totalFees)) : 0}%`}
                        className="text-green-500 bg-green-50/40"
                        titleStyle="text-3xl my-1 mt-3"
                        descriptionStyle="text-gray-500"
                    >
                        <TrendingUp className="size-4" />
                    </Card>
                    {/* <Card
                        title="No Payment"
                        description="Requires attention"
                        data="$3000"
                        className="text-red-500 bg-red-50/40"
                        titleStyle="text-3xl my-1 mt-3"
                        descriptionStyle="text-gray-500"
                    >
                        <CircleAlert className="size-4" />
                    </Card> */}
                </div>
                <AllStudentsPaymentWrapper allStudents={allStudentsData.allStudents} studentsCount={allStudentsData.studentsCount} />
            </div>
        </>
    );
};