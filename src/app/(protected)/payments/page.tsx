import Card from "@/components/dashboard/card";
import getPayments from "@/lib/server/getPayments";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import StudentsPaymentTable from "@/components/payments/studentsPaymentTable";
import { Calendar, CircleAlert, IndianRupeeIcon, TrendingUp } from "lucide-react";

export default async function Payments() {
    const studentsData = await getPayments();
    const totalFees = studentsData.reduce((sum: any, student: any) => sum + student.totalFees, 0);
    const paidFees = studentsData.reduce((sum: any, student: any) => sum + student.paidFees, 0);
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
                        description={`${studentsData ? studentsData.length : 0} students`}
                        data={`${Math.floor((100 * paidFees) / totalFees)}%`}
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
                <div className="rounded-2xl bg-white p-6 my-6 border border-gray-100 shadow-sm">
                    <p className="text-lg text-gray-800 font-medium">Search & Filter</p>
                    <div className="rounded-2xl bg-gray-50 p-2 mt-6 flex items-center">
                        <label htmlFor="searchStudent" className="text-gray-400 cursor-pointer">
                            <MagnifyingGlassIcon className="size-5 ml-2 mr-3" />
                        </label>
                        <input
                            type="text"
                            name="searchStudent"
                            id="searchStudent"
                            placeholder="Search by name"
                            className="w-full outline-none text-gray-500 font-medium border-b border-gray-200 pb-0.5"
                        />
                        <button
                            type="button"
                            className="text-gray-400 cursor-pointer hover:bg-gray-200 rounded-xl p-1.5 ease-out duration-300"
                        >
                            <XMarkIcon className="size-5" />
                        </button>
                    </div>
                </div>
                <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
                    <div className="mb-2">
                        <p className="text-lg font-bold text-gray-800">All Students</p>
                        <p className="text-sm font-medium text-gray-500">{studentsData ? studentsData.length : "0"} students found</p>
                    </div>
                    <StudentsPaymentTable allStudents={studentsData} />
                </div>
            </div>
        </>
    );
};