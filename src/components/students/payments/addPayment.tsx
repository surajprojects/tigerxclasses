import PaymentForm from "./paymentForm";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PaymentFormInput } from "@/utils/validators/paymentInput";
import { StudentCourseData } from "@/utils/types/studentCourseType";
import StudentPaymentSummaryCard from "@/components/card/student/studentPaymentSummaryCard";
import { formatDate } from "@/utils/dateAndTime";

export default function AddPayment({
    setShowForm,
    handleSubmit,
    studentCourseData,
    studentSummaryCard = true,
}: {
    studentCourseData?: StudentCourseData,
    handleSubmit: (data: PaymentFormInput) => Promise<void>,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    studentSummaryCard?: boolean,
}) {
    const handleCloseForm = () => {
        setShowForm(false);
    };
    return (
        <>
            <div onClick={handleCloseForm} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div onClick={(evt) => evt.stopPropagation()} className="bg-white p-6 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-none">
                    <button
                        type="button"
                        onClick={handleCloseForm}
                        className="absolute top-2 right-2 m-0.5 hover:bg-gray-100 duration-300 ease-out cursor-pointer rounded-xl p-0.5 text-gray-500"
                    >
                        <XMarkIcon className="size-4" />
                    </button>
                    <div className="w-md text-gray-800">
                        {/* Title */}
                        <h4 className="text-2xl font-medium">Record Payment</h4>
                        {/* Description */}
                        <p className="text-gray-500 my-2 mb-4">Add a new payment record</p>
                        {/* Summary Card */}
                        {studentSummaryCard && <StudentPaymentSummaryCard
                            studentName={studentCourseData ? studentCourseData.student.fullName : ""}
                            courseName={studentCourseData ? studentCourseData.course.name : ""}
                            batchName={studentCourseData ? studentCourseData.batch.name : ""}
                            enrolledOn={studentCourseData ? formatDate(studentCourseData.enrolledOn.split("T")[0]) : ""}
                        />}
                        {/* Payment Form */}
                        <PaymentForm btnText="Add Payment" handleSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    );
};