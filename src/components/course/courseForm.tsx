import Btn from "../button/btn";
import FormField from "../form/formField";
import { ChangeEvent, useState } from "react";

export default function CourseForm() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        institute: "",
        code: "",
        duration: "",
        fees: 0,
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
                {/* Course Name */}
                <FormField
                    id="name"
                    title="Course Name"
                    textHolder="DCA"
                    fieldValue={formData.name}
                    onChangeFunc={handleChange}
                />
                {/* Course Description */}
                <FormField
                    id="description"
                    title="Course Description"
                    textHolder="Diploma in Computer Applications"
                    fieldValue={formData.description}
                    onChangeFunc={handleChange}
                />
                {/* Institute */}
                <FormField
                    id="institute"
                    title="Institute"
                    textHolder="Makhanlal"
                    fieldValue={formData.institute}
                    onChangeFunc={handleChange}
                />
                {/* Code */}
                <FormField
                    id="code"
                    title="Code"
                    textHolder="DCA"
                    fieldValue={formData.code}
                    onChangeFunc={handleChange}
                />
                <div className="grid grid-cols-2 gap-4 mb-1">
                    {/* Duration */}
                    <FormField
                        id="duration"
                        title="Duration"
                        textHolder="3 Months"
                        fieldValue={formData.duration}
                        onChangeFunc={handleChange}
                    />
                    {/* Fees */}
                    <FormField
                        id="fees"
                        fieldType="number"
                        title="Fees"
                        textHolder="4000"
                        fieldValue={formData.fees}
                        onChangeFunc={handleChange}
                    />
                </div>
                {/* Add Button */}
                <Btn btnType="submit" text="Add Course" />
            </form>
        </>
    );
};