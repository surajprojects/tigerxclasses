import Btn from "@/components/button/btn";
import { useBatches } from "@/hooks/batches";
import { useCourses } from "@/hooks/courses";
import { ChangeEvent, useState } from "react";
import Spinner from "@/components/ui/spinner";
import FormField from "@/components/form/formField";
import { StudentCourseStatus } from "@/db/generated/prisma";
import { StudentCourseInput, StudentCourseInputEdit } from "@/utils/validators/studentCourseInput";

export default function StudentCourseForm({
    btnText = "Submit",
    handleSubmit,
    handleEditSubmit,
    initialData = {
        batchId: "",
        courseId: "",
        enrolledOn: new Date().toISOString().split("T")[0],
        totalFees: "",
        session: "",
        remarks: "",
        status: "ACTIVE",
    },
}: {
    btnText?: string,
    handleSubmit?: (data: StudentCourseInput) => Promise<void>,
    handleEditSubmit?: (data: StudentCourseInputEdit) => Promise<void>,
    initialData?: Required<StudentCourseInput>,
}) {
    const [formData, setFormData] = useState(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { batchesData, isLoading: batchesLoading } = useBatches();
    const { coursesData, isLoading: coursesLoading } = useCourses();

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const changedValue = evt.target.value;
        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: changedValue
            }
        });
    };

    return (
        <>
            {(batchesLoading && coursesLoading) ?
                <Spinner />
                :
                <form
                    onSubmit={async (evt) => {
                        evt.preventDefault();
                        if (!Object.values(StudentCourseStatus).includes(formData.status as StudentCourseStatus)) {
                            throw new Error("Invalid status");
                        }
                        setIsLoading(true);
                        const newFormData = {
                            ...formData,
                            status: formData.status as StudentCourseStatus,
                        };
                        // Handle submit function
                        handleSubmit && await handleSubmit(newFormData);
                        // Handle edit submit function
                        handleEditSubmit && await handleEditSubmit(newFormData);
                        setIsLoading(false);
                        setFormData(initialData);
                    }}
                    className="w-full">
                    {/* Batch */}
                    <div className="flex flex-col my-2">
                        <label htmlFor="batchId" className="font-sans font-medium text-sm text-gray-800">Batch*</label>
                        <select
                            id="batchId"
                            name="batchId"
                            value={formData.batchId}
                            onChange={handleChange}
                            className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                            <option value="" disabled>Select Batch</option>
                            {batchesData.map((batch, idx) => {
                                return <option key={idx} value={batch.id}>{batch.name}</option>;
                            })}
                        </select>
                    </div>
                    {/* Course */}
                    <div className="flex flex-col my-2">
                        <label htmlFor="courseId" className="font-sans font-medium text-sm text-gray-800">Course*</label>
                        <select
                            id="courseId"
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                            <option value="" disabled>Select Course</option>
                            {coursesData.map((course, idx) => {
                                return <option key={idx} value={course.id}>{course.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        {/* Enrolled On */}
                        <FormField
                            id="enrolledOn"
                            title="Enrolled On"
                            fieldType="date"
                            fieldValue={formData.enrolledOn}
                            onChangeFunc={handleChange}
                        />
                        {/* Total Fees */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="totalFees" className="font-sans font-medium text-sm text-gray-800">Total Fees*</label>
                            <input
                                type="text"
                                name="totalFees"
                                id="totalFees"
                                placeholder="8000"
                                inputMode="numeric"
                                minLength={1}
                                maxLength={10}
                                value={formData.totalFees}
                                onChange={(e) => {
                                    const totalFeesValue = e.target.value.replace(/\D/g, "");
                                    setFormData((prevData) => {
                                        return {
                                            ...prevData,
                                            totalFees: totalFeesValue,
                                        };
                                    });
                                }}
                                className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out"
                            />
                        </div>
                    </div>
                    {/* Session */}
                    <FormField
                        id="session"
                        title="Session"
                        textHolder="MAY 2025"
                        fieldValue={formData.session}
                        onChangeFunc={handleChange}
                    />
                    {/* Remarks */}
                    <FormField
                        id="remarks"
                        title="Remarks"
                        textHolder="Enter remarks"
                        fieldValue={formData.remarks ? formData.remarks : ""}
                        onChangeFunc={handleChange}
                        isRequired={false}
                    />
                    {handleEditSubmit &&
                        <>
                            {/* Status */}
                            <div className="flex flex-col my-2">
                                <label htmlFor="status" className="font-sans font-medium text-sm text-gray-800">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                                    {[...Object.values(StudentCourseStatus)].map((opt, idx) => {
                                        return <option key={idx} value={opt}>{opt}</option>
                                    })}
                                </select>
                            </div>
                        </>
                    }
                    {/* Add Button */}
                    <Btn btnType="submit" text={btnText} isLoading={isLoading} />
                </form>
            }
        </>
    );
};