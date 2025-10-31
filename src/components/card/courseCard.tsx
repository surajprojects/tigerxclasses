import { UsersIcon } from "@heroicons/react/24/outline";

export default function CourseCard() {
    return (
        <>
            <div className="w-full p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-white font-medium">
                <div>
                    <p className="text-xl text-gray-800">DCA</p>
                    <p className="text-base text-gray-500">Diploma in Computer Applications</p>
                </div>
                <div className="my-6 flex">
                    <div>
                        <p className="text-base text-gray-500">Institute</p>
                        <p className="text-lg text-gray-800">Makhanlal Ch</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-base text-gray-500">Code</p>
                        <p className="text-lg text-gray-800">DCA</p>
                    </div>
                    <div>
                        <p className="text-base text-gray-500">Duration</p>
                        <p className="text-lg text-gray-800">3 Months</p>
                    </div>
                    <div>
                        <p className="text-base text-gray-500">Fees</p>
                        <p className="text-lg text-gray-800">Rs.4000/-</p>
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