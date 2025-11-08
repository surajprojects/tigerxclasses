import Btn from "../button/btn";
import FormField from "../form/formField";
import { ChangeEvent, useState } from "react";

export default function BatchForm() {
    const [formData, setFormData] = useState({
        name: "",
        course: "",
        instructor: "",
        startDate: "",
        endDate: "",
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
                {/* Batch Name */}
                <FormField
                    id="name"
                    title="Batch Name"
                    textHolder="Batch A"
                    fieldValue={formData.name}
                    onChangeFunc={handleChange}
                />
                {/* Course */}
                <FormField
                    id="course"
                    title="Course"
                    textHolder="Web Development"
                    fieldValue={formData.course}
                    onChangeFunc={handleChange}
                />
                {/* Instructor */}
                <FormField
                    id="instructor"
                    title="Instructor"
                    textHolder="John Smith"
                    fieldValue={formData.instructor}
                    onChangeFunc={handleChange}
                />
                <div className="grid grid-cols-2 gap-4 mb-1">
                    {/* Start Date */}
                    <FormField
                        id="startDate"
                        title="Start Date"
                        fieldType="date"
                        fieldValue={formData.startDate}
                        onChangeFunc={handleChange}
                    />
                    {/* End Date */}
                    <FormField
                        id="endDate"
                        title="End Date"
                        fieldType="date"
                        fieldValue={formData.endDate}
                        onChangeFunc={handleChange}
                    />
                </div>
                {/* Add Button */}
                <Btn btnType="submit" text="Add Batch" />
            </form>
        </>
    );
};