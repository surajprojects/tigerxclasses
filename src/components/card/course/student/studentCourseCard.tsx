import CardData from "../../cardData";
import { StudentCourseData } from "@/utils/types/studentCourseType";
import ActionStudentCourseBtn from "@/components/button/course/student/actionStudentCourseBtn";
import { CalendarIcon } from "@heroicons/react/24/outline";

export default function StudentCourseCard({
    studentId,
    studentCourseData,
}: {
    studentId: string,
    studentCourseData: StudentCourseData,
}) {
    return (
        <>
            <div className="w-full p-6 rounded-2xl shadow-sm hover:shadow-md bg-[#fcfcfc] border border-white duration-300 ease-out hover:border-blue-500 hover:text-blue-500 font-normal">
                <div className="flex justify-between">
                    <div>
                        {/* Course Name */}
                        <p className="text-lg font-medium capitalize">{studentCourseData.course.name}</p>
                        {/* Batch Name */}
                        <p className="text-sm mt-0.5 text-gray-600">{studentCourseData.batch.name}</p>
                    </div>
                    <ActionStudentCourseBtn studentId={studentId} studentCourseData={studentCourseData} />
                </div>
                <div className="flex justify-between items-center">
                    {/* Enrolled On */}
                    <p className="text-xs text-gray-600 my-2 flex items-center"><CalendarIcon className="size-3 mr-1" />Enrolled:&nbsp;{studentCourseData.enrolledOn.split("T")[0]}</p>
                    {/* Student Course Status */}
                    <div>
                        <span className="text-blue-700 bg-blue-100 text-sm font-medium rounded-xl px-2.5 capitalize">{studentCourseData.status.toLowerCase()}</span>
                    </div>
                </div>
                {/* Fees Wrapper */}
                <div className="bg-white border border-gray-200 w-full rounded-2xl p-3 flex justify-evenly my-5">
                    {/* Total Fees */}
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-base text-black font-medium mt-0.5">&#8377;15000</p>
                    </div>
                    {/* Collected Fees */}
                    <div className="flex flex-col items-center justify-center border-x border-gray-200 px-3">
                        <p className="text-sm text-gray-500">Collected</p>
                        <p className="text-base text-green-600 font-medium mt-0.5">&#8377;10000</p>
                    </div>
                    {/* Pending Fees */}
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-base text-red-500 font-medium mt-0.5">&#8377;5000</p>
                    </div>
                </div>
                {/* Payment Progress */}
                <div>
                    <div className="flex justify-between mb-1.5">
                        <p className="text-sm text-gray-500">Payment Progress</p>
                        <p className="text-sm font-medium text-blue-500">67%</p>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-2xl">
                        <div className="w-[67%] h-2 bg-blue-500 rounded-2xl"></div>
                    </div>
                </div>
                {/* Payment Status */}
                <div className="my-2.5">
                    <span className="text-amber-700 bg-amber-100 rounded-2xl px-3 py-0.5 font-medium text-sm">Partial Payment</span>
                </div>
                <button type="button" className="text-gray-800 border border-gray-200 w-full text-center rounded-xl py-1.5 text-sm font-medium mt-2.5 cursor-pointer hover:bg-gray-200/60 duration-300 ease-out">View Payments &#40;2&#41;</button>
            </div>
        </>
    );
};