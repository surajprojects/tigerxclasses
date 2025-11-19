import Btn from "@/components/button/btn";
import { useBatches } from "@/hooks/batches";
import { useCourses } from "@/hooks/courses";
import { ChangeEvent, useState } from "react";
import Spinner from "@/components/ui/spinner";
import FormField from "@/components/form/formField";
import { StudentCourseData } from "@/utils/types/studentCourseType";
import { FeesStatus, StudentCourseStatus } from "@/db/generated/prisma";
import { StudentCourseInput, StudentCourseInputEdit } from "@/utils/validators/studentCourseInput";

export default function StudentCourseForm({
    btnText = "Submit",
    handleSubmit,
    handleEditSubmit,
    initialData = {
        batchId: "",
        courseId: "",
        enrolledOn: "",
        totalFees: 0,
        session: "",
        remarks: "",
        status: "ACTIVE",
        feesStatus: "PAID",
    },
}: {
    btnText?: string,
    handleSubmit?: (data: StudentCourseInput) => Promise<void>,
    handleEditSubmit?: (data: StudentCourseInputEdit) => Promise<void>,
    initialData?: Pick<StudentCourseData, "batchId" | "courseId" | "enrolledOn" | "totalFees" | "session" | "remarks" | "status" | "feesStatus">
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
                        if (!Object.values(FeesStatus).includes(formData.feesStatus as FeesStatus)) {
                            throw new Error("Invalid fees status");
                        }
                        setIsLoading(true);
                        const newFormData = {
                            ...formData,
                            totalFees: Number(formData.totalFees),
                            status: formData.status as StudentCourseStatus,
                            feesStatus: formData.feesStatus as FeesStatus,
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
                        <FormField
                            id="totalFees"
                            title="Total Fees"
                            fieldType="number"
                            fieldValue={formData.totalFees}
                            onChangeFunc={handleChange}
                        />
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
                            {/* Fees Status */}
                            <div className="flex flex-col my-2">
                                <label htmlFor="feesStatus" className="font-sans font-medium text-sm text-gray-800">Fees Status</label>
                                <select
                                    id="feesStatus"
                                    name="feesStatus"
                                    value={formData.feesStatus}
                                    onChange={handleChange}
                                    className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                                    {[...Object.values(FeesStatus)].map((opt, idx) => {
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