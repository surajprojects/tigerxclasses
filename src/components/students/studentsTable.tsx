import Link from "next/link";
import { formatDate } from "@/utils/dateAndTime";
import { StudentsList } from "@/utils/types/studentType";
import ActionStudentBtn from "../button/student/actionStudentBtn";

export default function Table({ allStudents }: { allStudents: StudentsList }) {
    return (
        <>
            <table className="w-full text-sm text-gray-600 text-center">
                <thead className="text-xs font-semibold text-gray-800 uppercase border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Roll No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Student Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Father Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mobile No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Course
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Batch
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Enrolled On
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(allStudents && (allStudents.length > 0)) ? allStudents.map((student) => {
                        const studentCourseData = student.studentCourses.find((studentCourse) => studentCourse.status === "ACTIVE");
                        return <tr key={student.id}
                            className="border-b border-gray-200 hover:bg-gray-100 duration-300 ease-out">
                            <td className="px-6 py-4">
                                {student.rollNo}
                            </td>
                            <td className="px-6 py-4 capitalize font-semibold">
                                <Link href={`/students/${student.id}/profile`}>
                                    {student.fullName}
                                </Link>
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {student.fatherName}
                            </td>
                            <td className="px-6 py-4">
                                {student.mobileNo}
                            </td>
                            <td className="px-6 py-4">
                                {studentCourseData ? studentCourseData.course.name : "-"}
                            </td>
                            <td className="px-6 py-4">
                                {studentCourseData ? studentCourseData.batch.name : "-"}
                            </td>
                            <td className="px-6 py-4">
                                {studentCourseData ? formatDate(studentCourseData.enrolledOn.split("T")[0]) : "-"}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {studentCourseData ? studentCourseData.status.toLowerCase() : "-"}
                            </td>
                            <td className="px-6 py-4">
                                <ActionStudentBtn studentId={student.id} />
                            </td>
                        </tr>
                    })
                        :
                        <tr className="h-14"><td colSpan={9} className="text-center">No students found!!!</td></tr>
                    }
                </tbody>
            </table>
        </>
    );
};