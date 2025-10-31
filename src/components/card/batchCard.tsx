import { UsersIcon } from "@heroicons/react/24/outline";

export default function BatchCard() {
    return (
        <>
            <div className="w-full p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-white font-medium">
                <div>
                    <p className="text-xl text-gray-800">Batch 1</p>
                    <p className="text-base text-gray-500">Web Development</p>
                </div>
                <div className="my-6 flex">
                    <div>
                        <p className="text-base text-gray-500">Code</p>
                        <p className="text-lg text-gray-800">B01T10AM</p>
                    </div>
                    <div className="mx-auto">
                        <p className="text-base text-gray-500">Time</p>
                        <p className="text-lg text-gray-800">10:00 AM</p>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <p className="text-base text-gray-500">Start Date</p>
                        <p className="text-lg text-gray-800">2025-01-15</p>
                    </div>
                    <div className="mx-auto">
                        <p className="text-base text-gray-500">End Date</p>
                        <p className="text-lg text-gray-800">2025-06-15</p>
                    </div>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200 flex items-center">
                    <UsersIcon className="size-5 mr-2 text-cyan-500" />
                    <p className="text-base text-gray-800">25 students</p>
                </div>
            </div>
        </>
    );
};