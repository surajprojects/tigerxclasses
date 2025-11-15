import { BatchData } from "@/utils/types/batchType";
import { UsersIcon } from "@heroicons/react/24/outline";
import ActionBatchBtn from "../button/batch/actionBatchBtn";

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
            <div className="w-full p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-white font-medium">
                <div className="flex justify-between">
                    <div>
                        <p className="text-xl text-gray-800">{batchData.name}</p>
                        <p className="text-base text-gray-500">{batchData.description}</p>
                    </div>
                    <ActionBatchBtn batchData={batchData} />
                </div>
                <div className="my-6 flex">
                    <div>
                        <p className="text-base text-gray-500">Code</p>
                        <p className="text-lg text-gray-800">{batchData.code}</p>
                    </div>
                    <div className="mx-auto">
                        <p className="text-base text-gray-500">Time</p>
                        <p className="text-lg text-gray-800">{Number(batchData.time.split(":")[0]) > 12 ? `${Number(batchData.time.split(":")[0]) - 12}:${batchData.time.split(":")[1]}` : batchData.time}&nbsp;{Number(batchData.time.split(":")[0]) > 12 ? "PM" : "AM"}</p>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <p className="text-base text-gray-500">Start Date</p>
                        <p className="text-lg text-gray-800">{batchData.startDate.split("T")[0]}</p>
                    </div>
                    <div className="mx-auto">
                        <p className="text-base text-gray-500">End Date</p>
                        <p className="text-lg text-gray-800">{batchData.endDate.split("T")[0]}</p>
                    </div>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200 flex items-center">
                    <UsersIcon className="size-5 mr-2 text-cyan-500" />
                    <p className="text-base text-gray-800">{batchData._count.students}&nbsp;students</p>
                </div>
            </div>
        </>
    );
};