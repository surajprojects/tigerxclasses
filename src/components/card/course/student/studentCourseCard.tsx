import CardData from "../../cardData";
import { StudentCourseData } from "@/utils/types/studentCourseType";
import ActionStudentCourseBtn from "@/components/button/course/student/actionStudentCourseBtn";

export default function StudentCourseCard({
    studentId,
    studentCourseData,
}: {
    studentId: string,
    studentCourseData: StudentCourseData
}) {
    return (
        <>
            <div className="w-full p-6 rounded-2xl shadow-sm hover:shadow-md bg-white font-medium">
                {/* Name & Description */}
                <div className="flex justify-between">
                    <div>
                        <p className="text-xl text-gray-800">{studentCourseData.course.name}</p>
                        <p className="text-base text-gray-500">{studentCourseData.course.description}</p>
                    </div>
                    <ActionStudentCourseBtn studentId={studentId} studentCourseData={studentCourseData} />
                </div>

                <div className="my-6 flex">
                    {/* Batch */}
                    <CardData
                        fieldName="Batch"
                        fieldValue={studentCourseData.batch.code}
                        secondary={true}
                    />
                    {/* Enrolled On */}
                    <CardData
                        fieldName="Enrolled On"
                        fieldValue={studentCourseData.enrolledOn.split("T")[0]}
                        secondary={true}
                        marginX={true}
                    />
                </div>
                <div className="flex">
                    {/* Total Fees */}
                    <CardData
                        fieldName="Total Fees"
                        fieldValue={`Rs.${studentCourseData.totalFees}/-`}
                        secondary={true}
                    />
                    {/* Due Fees */}
                    <CardData
                        fieldName="Due Fees"
                        fieldValue={`Rs.${studentCourseData.payments.reduce((sum, payment) => sum + payment.amount, 0)}/-`}
                        secondary={true}
                        marginX={true}
                    />
                </div>
                <div className="flex mt-6">
                    {/* Fees Status */}
                    <CardData
                        fieldName="Fees Status"
                        fieldValue={studentCourseData.feesStatus}
                        secondary={true}
                    />
                    {/* Status */}
                    <CardData
                        fieldName="Status"
                        fieldValue={studentCourseData.status}
                        secondary={true}
                        marginX={true}
                    />
                </div>
            </div>
        </>
    );
};