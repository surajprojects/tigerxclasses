import StudentCourseForm from "./studentCourseForm";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StudentCourseData } from "@/utils/types/studentCourseType";
import { StudentCourseInputEdit } from "@/utils/validators/studentCourseInput";

export default function EditStudentCourse({
    setShowForm,
    handleEditSubmit,
    studentCourseData,
}: {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    handleEditSubmit?: (data: StudentCourseInputEdit) => Promise<void>,
    studentCourseData: StudentCourseData,
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
                    <div className="w-md">
                        <h5 className="text-2xl font-medium text-gray-800">Edit Student Course</h5>
                        <p className="text-gray-600 text-base my-1">Update student course</p>
                        <StudentCourseForm
                            btnText="Update Student Course"
                            handleEditSubmit={handleEditSubmit}
                            initialData={{
                                batchId: studentCourseData.batchId,
                                courseId: studentCourseData.courseId,
                                enrolledOn: studentCourseData.enrolledOn.split("T")[0],
                                session: studentCourseData.session,
                                totalFees: studentCourseData.totalFees,
                                status: studentCourseData.status,
                                feesStatus: studentCourseData.feesStatus,
                                remarks: studentCourseData.remarks ? studentCourseData.remarks : "",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};