import Btn from "../button/btn";
import FormField from "../form/formField";
import { ChangeEvent, useState } from "react";
import { CourseFormInput, CourseFormInputEdit } from "@/utils/validators/courseInput";

export default function CourseForm({
    btnText = "Submit",
    handleSubmit,
    handleEditSubmit,
    initialData = {
        code: "",
        description: "",
        duration: "",
        fees: "",
        instituteName: "",
        name: "",
    },
}: {
    btnText?: string,
    handleSubmit?: (data: CourseFormInput) => Promise<void>,
    handleEditSubmit?: (data: CourseFormInputEdit) => Promise<void>,
    initialData?: CourseFormInput,
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
                    const newFormData = {
                        ...formData,
                        fees: formData.fees,
                    };
                    // Handle submit function
                    handleSubmit && await handleSubmit(newFormData);
                    // Handle edit submit function
                    handleEditSubmit && await handleEditSubmit(newFormData);
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
                    title="Code (Must be unique)"
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
                    <div className="flex flex-col my-2">
                        <label htmlFor="fees" className="font-sans font-medium text-sm text-gray-800">Fees*</label>
                        <input
                            type="text"
                            name="fees"
                            id="fees"
                            placeholder="8000"
                            inputMode="numeric"
                            maxLength={10}
                            value={formData.fees}
                            onChange={(e) => {
                                const feesValue = e.target.value.replace(/\D/g, "");
                                setFormData((prevData) => {
                                    return {
                                        ...prevData,
                                        fees: feesValue,
                                    };
                                });
                            }}

                            className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out"
                        />
                    </div>
                </div>
                {/* Add Button */}
                <Btn btnType="submit" text={btnText} isLoading={isLoading} />
            </form>
        </>
    );
};