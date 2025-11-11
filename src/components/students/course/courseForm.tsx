import Btn from "@/components/button/btn";
import FormField from "@/components/form/formField";
import { ChangeEvent, useState } from "react";

export default function CourseForm() {
    const [formData, setFormData] = useState({
        batch: "",
        course: "",
        enrolledOn: "",
        totalFees: "",
        session: "",
        remarks: "",
    });

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
            <form className="w-full">
                {/* Batch */}
                <div className="flex flex-col my-2">
                    <label htmlFor="batch" className="font-sans font-medium text-sm text-gray-800">Batch</label>
                    <select onChange={handleChange} name="batch" id="batch" className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out">
                        <option value="B01T7AM">B01T7AM</option>
                        <option value="B02T9AM">B02T9AM</option>
                    </select>
                </div>
                {/* Course */}
                <div className="flex flex-col my-2">
                    <label htmlFor="course" className="font-sans font-medium text-sm text-gray-800">Course</label>
                    <select onChange={handleChange} name="course" id="course" className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out">
                        <option value="TALLY">TALLY</option>
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
                        textHolder="4500"
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
                    fieldValue={formData.remarks}
                    onChangeFunc={handleChange}
                />
                {/* Add Button */}
                <Btn btnType="submit" text="Add Course" />
            </form>
        </>
    );
};