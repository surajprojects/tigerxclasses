"use client"

import dynamic from "next/dynamic";

const FeesPieChart = dynamic(
    () => import("@/components/dashboard/feesPieChart"),
    { ssr: false }
);

export default function ChartsWrapper({ dashboardData }: { dashboardData: any }) {
    if (!dashboardData) {
        return <p className="italic font-medium">Data not found!!!</p>;
    }
    return (
        <>
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
        </>
    );
};