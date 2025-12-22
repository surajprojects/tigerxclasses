import { formatDate } from "@/utils/dateAndTime";
import { BatchData } from "@/utils/types/batchType";
import ActionBatchBtn from "../button/batch/actionBatchBtn";
import { UsersIcon, ClockIcon, CalendarDateRangeIcon } from "@heroicons/react/24/outline";

export default function BatchCard({
    batchData = {
        id: "#",
        name: "Batch 1",
        description: "Web Development",
        code: "B01T7AM",
        time: "10:00 AM",
        startDate: "2025-01-01",
        endDate: "2025-01-01",
        _count: { students: 0 },
    },
}: { batchData?: BatchData }) {
    return (
        <>
            <div className="w-full p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-[#f8fafc] font-normal duration-300 ease-out">
                <div className="flex justify-between">
                    <div>
                        <p className="text-lg font-medium text-gray-800">{batchData.name}</p>
                        <p className="text-base text-gray-600">{batchData.description}</p>
                    </div>
                    <ActionBatchBtn batchData={batchData} />
                </div>
                <div className="my-5 flex">
                    <div>
                        <p className="text-sm text-gray-600">Code</p>
                        <p className="text-base font-medium text-gray-800">{batchData.code}</p>
                    </div>
                    <div className="mx-auto">
                        <p className="text-sm text-gray-600 flex items-center"><ClockIcon className="size-3.5 mr-1" />Time</p>
                        <p className="text-base font-medium text-gray-800">{Number(batchData.time.split(":")[0]) > 12 ? `${Number(batchData.time.split(":")[0]) - 12}:${batchData.time.split(":")[1]}` : batchData.time}&nbsp;{Number(batchData.time.split(":")[0]) > 12 ? "PM" : "AM"}</p>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <p className="text-sm text-gray-600 flex items-center"><CalendarDateRangeIcon className="size-3.5 mr-1" />Start Date</p>
                        <p className="text-base font-medium text-gray-800">{formatDate(batchData.startDate.split("T")[0])}</p>
                    </div>
                    <div className="mx-auto">
                        <p className="text-sm text-gray-600 flex items-center"><CalendarDateRangeIcon className="size-3.5 mr-1" />End Date</p>
                        <p className="text-base font-medium text-gray-800">{formatDate(batchData.endDate.split("T")[0])}</p>
                    </div>
                </div>
                <div className="pt-3.5 mt-3.5 border-t border-gray-200 flex items-center">
                    <UsersIcon className="size-5 mr-2 text-cyan-500" />
                    <p className="text-base font-medium text-gray-800">{batchData._count.students}&nbsp;students</p>
                </div>
            </div>
        </>
    );
};