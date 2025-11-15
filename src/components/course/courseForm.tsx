import Btn from "../button/btn";
import FormField from "../form/formField";
import { ChangeEvent, useState } from "react";
import { CourseData } from "@/utils/types/courseType";
import { CourseFormInput, CourseFormInputEdit } from "@/utils/validators/courseInput";

export default function CourseForm({
    btnText = "Submit",
    handleSubmit,
    handleEditSubmit,
    initialData = {
        code: "",
        description: "",
        duration: "",
        fees: 0,
        instituteName: "",
        name: "",
    },
}: {
    btnText?: string,
    handleSubmit?: (data: CourseFormInput) => Promise<void>,
    handleEditSubmit?: (data: CourseFormInputEdit) => Promise<void>,
    initialData?: Omit<CourseData, "id" | "_count">,
}) {
    const [formData, setFormData] = useState(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
            <form
                onSubmit={async (evt) => {
                    evt.preventDefault();
                    setIsLoading(true);
                    // Handle submit function
                    handleSubmit && await handleSubmit({ ...formData, fees: Number(formData.fees) });
                    // Handle edit submit function
                    handleEditSubmit && await handleEditSubmit({ ...formData, fees: Number(formData.fees) });
                    setIsLoading(false);
                    setFormData(initialData);
                }}
                className="w-full">
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
                    id="instituteName"
                    title="Institute Name"
                    textHolder="Dikshant Institute"
                    fieldValue={formData.instituteName}
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
                <Btn btnType="submit" text={btnText} isLoading={isLoading} />
            </form>
        </>
    );
};