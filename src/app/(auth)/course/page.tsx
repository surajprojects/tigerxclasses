import CourseCard from "@/components/card/courseCard";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Course() {
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h6 className="text-4xl text-gray-800 font-bold">Courses</h6>
                        <p className="my-1 font-medium text-gray-500 text-lg">Manage all available courses</p>
                    </div>
                    <button
                        type="button"
                        className="text-white bg-blue-500 rounded-xl px-4 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-400 h-fit w-fit flex items-center justify-center"
                    >
                        <PlusIcon className="size-5 mr-2" />
                        Add Course
                    </button>
                </div>
                <div className="my-8 flex gap-6">
                    <CourseCard />
                    <CourseCard />
                    <CourseCard />
                </div>
            </div>
        </>
    );
};