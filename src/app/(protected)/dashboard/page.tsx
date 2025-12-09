import { DollarSign } from "lucide-react";
import Card from "@/components/dashboard/card";
import getDashboard from "@/lib/server/getDashboard";
import FeesPieChart from "@/components/dashboard/feesPieChart";
import StudentsLineChart from "@/components/dashboard/studentsLineChart";
import { BookOpenIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export default async function Dashboard() {
    const dashboardData = await getDashboard();
    return (
        <>
            <div>
                <h6 className="text-4xl text-blue-500 font-bold">Dashboard</h6>
                <p className="my-2 font-medium text-gray-500 text-base">Welcome back! Here's your management overview.</p>
                <div className="grid grid-cols-4 gap-6 my-8">
                    {/* Total Students */}
                    <Card
                        title="Total Students"
                        description="All students currently recorded"
                        data={`${dashboardData.totalStudents}`}
                        className="bg-blue-50 text-blue-500"
                    />
                    {/* Active Students */}
                    <Card
                        title="Active Students"
                        description="All students currently active"
                        data={`${dashboardData.activeStudents}`}
                        className="bg-cyan-50 text-cyan-500"
                    >
                        <BookOpenIcon className="size-6" />
                    </Card>
                    {/* Total Receivables */}
                    <Card
                        title="Total Receivables"
                        description="Total amount yet to be received"
                        data={`₹${dashboardData.totalFees - dashboardData.totalFeesPaid}/-`}
                        className="bg-amber-50 text-amber-500"
                    >
                        <DollarSign className="size-6" />
                    </Card>
                    {/* Payment Rate */}
                    <Card
                        title="Payment Rate"
                        description="Overall fees collection efficiency"
                        data={`${(dashboardData.totalStudents > 0) ? Math.floor((dashboardData.totalFeesPaid / dashboardData.totalFees) * 100) : 0}%`}
                        className="bg-green-50 text-green-500"
                    >
                        <ArrowTrendingUpIcon className="size-6" />
                    </Card>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {/* Students Line Chart */}
                    {/* <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-5">
                        <div className="mb-4">
                            <p className="text-xl font-bold text-gray-800">Students Growth</p>
                            <p className="text-sm mt-1 text-gray-600">Monthly students enrollment trend</p>
                        </div>
                        <StudentsLineChart />
                    </div> */}
                    {/* Fees Pie Chart */}
                    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md p-5">
                        <div className="mb-4">
                            <p className="text-xl font-bold text-gray-800">Payment Status</p>
                            <p className="text-sm mt-1 text-gray-600">Distribution of payment</p>
                        </div>
                        <FeesPieChart
                            firstValue={dashboardData.totalFeesPaid}
                            secondValue={(dashboardData.totalFees) - (dashboardData.totalFeesPaid)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};