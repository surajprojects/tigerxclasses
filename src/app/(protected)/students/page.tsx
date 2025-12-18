import getStudents from "@/lib/server/getStudents";
import AddStudentBtn from "@/components/button/student/addStudentBtn";
import AllStudentsWrapper from "@/components/students/allStudentsWrapper";
import StudentsSearchFilter from "@/components/students/studentsSearchFilter";

export default async function Students() {
    const allStudentsData = await getStudents();
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
                <StudentsSearchFilter />
                <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
                    <div className="mb-2">
                        <p className="text-lg font-bold text-gray-800">All Students</p>
                        <p className="text-sm font-medium text-gray-500">{allStudentsData ? allStudentsData.studentsCount : "0"} students found</p>
                    </div>
                    {allStudentsData && <AllStudentsWrapper
                        allStudents={allStudentsData.allStudents}
                        studentsCount={allStudentsData.studentsCount}
                    />}
                </div>
            </div>
        </>
    );
};