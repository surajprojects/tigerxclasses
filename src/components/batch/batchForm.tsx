import Btn from "../button/btn";
import FormField from "../form/formField";
import { ChangeEvent, useState } from "react";
import { BatchFormInput, BatchFormInputEdit } from "@/utils/validators/batchInput";

export default function BatchForm({
    btnText = "Submit",
    handleSubmit,
    handleEditSubmit,
    initialData = {
        name: "",
        description: "",
        code: "",
        time: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
    },
}: {
    btnText?: string,
    handleSubmit?: (data: BatchFormInput) => Promise<void>,
    handleEditSubmit?: (data: BatchFormInputEdit) => Promise<void>,
    initialData?: Required<BatchFormInput>,
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
                    handleSubmit && await handleSubmit(formData);
                    // Handle edit submit function
                    handleEditSubmit && await handleEditSubmit(formData);
                    setIsLoading(false);
                    setFormData(initialData);
                }}
                className="w-full">
                {/* Batch Name */}
                <FormField
                    id="name"
                    title="Batch Name"
                    textHolder="Batch A"
                    fieldValue={formData.name}
                    onChangeFunc={handleChange}
                />
                {/* Description */}
                <FormField
                    id="description"
                    title="Description"
                    textHolder="Web Development"
                    fieldValue={formData.description}
                    onChangeFunc={handleChange}
                />
                {/* Code */}
                <FormField
                    id="code"
                    title="Code (Must be unique)"
                    textHolder="B01T7AM"
                    fieldValue={formData.code}
                    onChangeFunc={handleChange}
                />
                {/* Time */}
                <FormField
                    id="time"
                    title="Time"
                    fieldType="time"
                    fieldValue={formData.time}
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
                <Btn btnType="submit" text={btnText} isLoading={isLoading} />
            </form >
        </>
    );
};