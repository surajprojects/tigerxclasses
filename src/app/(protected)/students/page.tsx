import getStudents from "@/lib/server/getStudents";
import AddStudentBtn from "@/components/button/student/addStudentBtn";
import AllStudentsWrapper from "@/components/students/allStudentsWrapper";

export default async function Students() {
    const allStudentsData = await getStudents();
    if (!allStudentsData) {
        return <p className="italic font-medium">Students not found!!!</p>;
    }
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h6 className="text-4xl text-gray-800 font-bold">Students</h6>
                        <p className="my-1 font-medium text-gray-500 text-lg">Manage all your students</p>
                    </div>
                    <AddStudentBtn />
                </div>
                <AllStudentsWrapper allStudents={allStudentsData.allStudents} studentsCount={allStudentsData.studentsCount} />
            </div>
        </>
    );
};