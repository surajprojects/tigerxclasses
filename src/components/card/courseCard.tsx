import { CourseData } from "@/utils/types/courseType";
import { UsersIcon } from "@heroicons/react/24/outline";
import ActionCourseBtn from "../button/course/actionCourseBtn";

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
            <div className="w-full p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md bg-white font-medium">
                <div className="flex justify-between">
                    <div>
                        <p className="text-xl text-gray-800">{courseData.name}</p>
                        <p className="text-base text-gray-500">{courseData.description}</p>
                    </div>
                    <ActionCourseBtn courseData={courseData} />
                </div>
                <div className="my-6 flex">
                    <div>
                        <p className="text-base text-gray-500">Institute</p>
                        <p className="text-lg text-gray-800">{courseData.instituteName}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-base text-gray-500">Code</p>
                        <p className="text-lg text-gray-800">{courseData.code}</p>
                    </div>
                    <div>
                        <p className="text-base text-gray-500">Duration</p>
                        <p className="text-lg text-gray-800">{courseData.duration}</p>
                    </div>
                    <div>
                        <p className="text-base text-gray-500">Fees</p>
                        <p className="text-lg text-gray-800">Rs.{courseData.fees}/-</p>
                    </div>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200 flex items-center">
                    <UsersIcon className="size-5 mr-2 text-cyan-500" />
                    <p className="text-base text-gray-800">{courseData._count.students}&nbsp;students</p>
                </div>
            </div>
        </>
    );
};