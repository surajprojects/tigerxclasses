import { CourseData } from "@/utils/types/courseType";
import ActionCourseBtn from "@/components/button/course/actionCourseBtn";
import { UsersIcon, ClockIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";

export default function CourseCard({
    courseData = {
        id: "#",
        name: "DCA",
        description: "Diploma in Computer Applications",
        instituteName: "Dikshant Institute",
        code: "DCA",
        duration: "6 Months",
        fees: 8000,
        _count: { students: 0 },
    },
}: { courseData?: CourseData }) {
    return (
        <>
            <div className="w-full p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-[#f8fafc] font-normal duration-300 ease-out text-slate-500">
                <div className="flex justify-between">
                    <div>
                        <p className="text-xl text-gray-800 font-medium capitalize hover:text-blue-500 duration-300 ease-out">{courseData.name}</p>
                        <p className="text-sm font-mono mt-1.5">{courseData.code}</p>
                    </div>
                    <ActionCourseBtn courseData={courseData} />
                </div>
                <p className="text-sm my-6 mt-8">{courseData.description}</p>
                <div className="flex justify-center">
                    <div className="flex flex-col items-center justify-between pr-4">
                        <p className="text-sm flex items-center mb-1"><ClockIcon className="size-3.5 mr-1.5" />Duration</p>
                        <p className="text-base font-medium text-slate-800">{courseData.duration}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between border-x border-gray-200 px-2.5">
                        <p className="text-sm flex items-center mb-1"><UsersIcon className="size-3.5 mr-1.5" />Students</p>
                        <p className="text-base font-medium text-slate-800">{courseData._count.students}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between pl-4">
                        <p className="text-sm flex items-center mb-1"><CurrencyRupeeIcon className="size-3.5 mr-1.5" />Fees</p>
                        <p className="text-base font-medium text-blue-500">&#8377;{courseData.fees}</p>
                    </div>
                </div>
                <div className="mt-8">
                    <p className="text-sm flex items-center">Institute</p>
                    <p className="text-base font-medium text-slate-800">{courseData.instituteName}</p>
                </div>
            </div>
        </>
    );
};