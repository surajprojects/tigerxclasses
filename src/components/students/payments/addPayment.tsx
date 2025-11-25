import PaymentForm from "./paymentForm";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PaymentFormInput } from "@/utils/validators/paymentInput";
import { StudentCourseData } from "@/utils/types/studentCourseType";

export default function AddPayment({
    setShowForm,
    handleSubmit,
    studentCourseData,
}: {
    studentCourseData: StudentCourseData,
    handleSubmit: (data: PaymentFormInput) => Promise<void>,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
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
                        <div className="bg-blue-50 rounded-xl shadow p-4 mb-4 border border-blue-100 grid grid-cols-2 gap-8">
                            <div>
                                <div>
                                    <p className="text-gray-600">Student</p>
                                    <p className="font-bold text-gray-700 text-lg">{studentCourseData.student.fullName}</p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-gray-600">Course</p>
                                    <p className="font-bold text-gray-700 text-lg">{studentCourseData.course.name}</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className="text-gray-600">Batch</p>
                                    <p className="font-bold text-gray-700 text-lg">{studentCourseData.batch.name}</p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-gray-600">Enrolled On</p>
                                    <p className="font-bold text-gray-700 text-lg">{studentCourseData.enrolledOn.split("T")[0]}</p>
                                </div>
                            </div>
                        </div>
                        {/* Payment Form */}
                        <PaymentForm btnText="Add Payment" handleSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    );
};