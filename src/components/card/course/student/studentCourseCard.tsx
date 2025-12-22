import clsx from "clsx";
import { formatDate } from "@/utils/dateAndTime";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { StudentCourseData } from "@/utils/types/studentCourseType";
import AddPaymentBtn from "@/components/button/student/payment/addPaymentBtn";
import ViewPaymentsBtn from "@/components/button/student/payment/viewPaymentsBtn";
import ActionStudentCourseBtn from "@/components/button/course/student/actionStudentCourseBtn";

export default function StudentCourseCard({
    studentId,
    studentCourseData,
}: {
    studentId: string,
    studentCourseData: StudentCourseData,
}) {
    const totalPayment = studentCourseData.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const paymentProgress = Math.floor(totalPayment / studentCourseData.totalFees * 100);
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
                    <p className="text-xs text-gray-600 my-2 flex items-center"><CalendarIcon className="size-3 mr-1" />Enrolled:&nbsp;{formatDate(studentCourseData.enrolledOn.split("T")[0])}</p>
                    {/* Student Course Status */}
                    <div>
                        <span className={clsx("text-sm font-medium rounded-xl px-2.5 capitalize", studentCourseData.status === "ACTIVE" ? "text-blue-700 bg-blue-100 border border-blue-200/60" : studentCourseData.status === "COMPLETED" ? "text-green-700 bg-green-100 border border-green-200/60" : studentCourseData.status === "DROPPED" ? "text-red-700 bg-red-100 border border-red-200/60" : studentCourseData.status === "ONHOLD" ? "text-yellow-700 bg-yellow-100 border border-yellow-200/60" : studentCourseData.status === "TERMINATED" ? "text-gray-700 bg-gray-100 border border-gray-200/60" : "")}>{studentCourseData.status.toLowerCase()}</span>
                    </div>
                </div>
                {/* Fees Wrapper */}
                <div className="bg-white border border-gray-200 w-full rounded-2xl p-3 flex justify-evenly my-5">
                    {/* Total Fees */}
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-base text-black font-medium mt-0.5">&#8377;{studentCourseData.totalFees}</p>
                    </div>
                    {/* Collected Fees */}
                    <div className="flex flex-col items-center justify-center border-x border-gray-200 px-3">
                        <p className="text-sm text-gray-500">Collected</p>
                        <p className="text-base text-green-600 font-medium mt-0.5">&#8377;{totalPayment}</p>
                    </div>
                    {/* Pending Fees */}
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-base text-red-500 font-medium mt-0.5">&#8377;{studentCourseData.totalFees - totalPayment}</p>
                    </div>
                </div>
                {/* Payment Progress */}
                <div>
                    <div className="flex justify-between mb-1.5">
                        <p className="text-sm text-gray-500">Payment Progress</p>
                        <p className="text-sm font-medium text-blue-500">{paymentProgress}%</p>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-2xl">
                        <div className="h-2 bg-blue-500 rounded-2xl duration-300 ease-out" style={{ width: `${paymentProgress}%` }}></div>
                    </div>
                </div>
                {/* Payment Status */}
                <div className="my-2.5 flex justify-between items-center">
                    <span className={clsx("rounded-2xl px-3 py-0.5 font-medium text-sm", studentCourseData.feesStatus === "PAID" ? "text-green-700 bg-green-100" : studentCourseData.feesStatus === "PARTIAL" ? "text-amber-700 bg-amber-100" : studentCourseData.feesStatus === "UNPAID" ? "text-red-700 bg-red-100" : "")}>
                        {studentCourseData.feesStatus === "PAID" ? "Full Payment" : studentCourseData.feesStatus === "PARTIAL" ? "Partial Payment" : studentCourseData.feesStatus === "UNPAID" ? "No Payment" : ""}
                    </span>
                    {studentCourseData.totalFees !== totalPayment && <AddPaymentBtn studentId={studentId} studentCourseData={studentCourseData} />}
                </div>
                {/* View Payments Button */}
                <ViewPaymentsBtn
                    title={studentCourseData.course.name}
                    studentId={studentId}
                    studentCourseId={studentCourseData.id}
                    paymentsList={studentCourseData.payments}
                />
            </div>
        </>
    );
};