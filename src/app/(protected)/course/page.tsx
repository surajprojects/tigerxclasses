import getCourses from "@/lib/server/getCourses";
import CourseCard from "@/components/card/courseCard";
import AddCourseBtn from "@/components/button/course/addCourse";

export default async function Course() {
    const courseData = await getCourses();
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h6 className="text-4xl text-gray-800 font-bold">Courses</h6>
                        <p className="my-1 font-medium text-gray-500 text-lg">Manage all available courses</p>
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
                        <p>No courses found!!!</p>
                    }
                </div>
            </div>
        </>
    );
};