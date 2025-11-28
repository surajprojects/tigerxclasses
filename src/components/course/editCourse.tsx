import CourseForm from "./courseForm";
import { CourseData } from "@/utils/types/courseType";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CourseFormInputEdit } from "@/utils/validators/courseInput";

export default function EditCourse({
    setShowForm,
    courseData,
    handleEditSubmit,
}: {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    courseData: CourseData,
    handleEditSubmit: (data: CourseFormInputEdit) => Promise<void>,
}) {
    const handleCloseForm = () => {
        setShowForm(false);
    };
    return (
        <>
            <div onClick={handleCloseForm} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div onClick={(evt) => evt.stopPropagation()} className="bg-white p-6 rounded-xl shadow-lg relative">
                    <button
                        type="button"
                        onClick={handleCloseForm}
                        className="absolute top-2 right-2 m-0.5 hover:bg-gray-100 duration-300 ease-out cursor-pointer rounded-xl p-0.5 text-gray-500"
                    >
                        <XMarkIcon className="size-4" />
                    </button>
                    <div className="w-md max-w-lg">
                        <h5 className="text-lg font-medium text-gray-800">Edit Course</h5>
                        <p className="text-gray-600 text-base my-1">Update course information</p>
                        <CourseForm
                            initialData={{
                                name: courseData.name,
                                description: courseData.description,
                                instituteName: courseData.instituteName,
                                code: courseData.code,
                                duration: courseData.duration,
                                fees: String(courseData.fees),
                            }}
                            btnText="Update Course"
                            handleEditSubmit={handleEditSubmit}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};