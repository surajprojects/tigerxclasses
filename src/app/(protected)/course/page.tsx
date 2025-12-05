import getCourses from "@/lib/server/getCourses";
import CourseCard from "@/components/card/course/courseCard";
import AddCourseBtn from "@/components/button/course/addCourseBtn";

export default async function Course() {
    const courseData = await getCourses();
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h6 className="text-3xl text-gray-800 font-bold">Courses</h6>
                        <p className="mt-0.5 font-normal text-gray-500 text-base">Manage all available courses</p>
                    </div>
                    <AddCourseBtn />
                </div>
                <div className="my-8 grid grid-cols-3 gap-6">
                    {courseData && courseData.length > 0 ? courseData.map((course) => {
                        return <CourseCard
                            key={course.id}
                            courseData={course}
                        />
                    })
                        :
                        <p className="italic text-gray-500">No courses found!!!</p>
                    }
                </div>
            </div>
        </>
    );
};