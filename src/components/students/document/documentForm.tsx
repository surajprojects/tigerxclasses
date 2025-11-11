import Btn from "@/components/button/btn";
import FormField from "@/components/form/formField";
import { ChangeEvent, useState } from "react";

export default function DocumentForm() {
    const [formData, setFormData] = useState({
        documentType: "",
        documentName: "",
        institute: "",
        instituteName: "",
        aadhaarNo: "",
        idNo: "",
        rollNo: "",
        enrollmentNo: "",
        session: "",
        obtainedMarks: "",
        totalMarks: "",
        documentLink: "",
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
                {/* Document Type */}
                <div className="flex flex-col my-2">
                    <label htmlFor="documentType" className="font-sans font-medium text-sm text-gray-800">Document Type</label>
                    <select
                        id="documentType"
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                        className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out"
                    >
                        <option value="AADHAAR">AADHAAR</option>
                        <option value="SECONDARY">SECONDARY</option>
                        <option value="HIGHERSECONDARY">HIGHERSECONDARY</option>
                        <option value="GRADUATION">GRADUATION</option>
                        <option value="POSTGRADUATION">POSTGRADUATION</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                </div>

                {/* Aadhaar No */}
                {formData.documentType === "AADHAAR" &&
                    <FormField
                        id="aadhaarNo"
                        title="Aadhaar No"
                        textHolder="1234 5678 1225"
                        fieldValue={formData.aadhaarNo}
                        onChangeFunc={handleChange}
                    />
                }

                {/* Secondary/HigherSecondary/Graduation/PostGraduation  */}
                {((formData.documentType === "SECONDARY") || (formData.documentType === "HIGHERSECONDARY") || (formData.documentType === "GRADUATION") || (formData.documentType === "POSTGRADUATION")) &&
                    <>
                        {/* School/College Name */}
                        <FormField
                            id="instituteName"
                            title="School/College Name"
                            textHolder="Govt. P.G. College Sheopur"
                            fieldValue={formData.instituteName}
                            onChangeFunc={handleChange}
                        />
                        <div className="grid grid-cols-2 gap-x-4">
                            {/* Roll No */}
                            <FormField
                                id="rollNo"
                                title="Roll No"
                                textHolder="123456"
                                fieldValue={formData.rollNo}
                                onChangeFunc={handleChange}
                            />
                            {/* Enrollment No */}
                            <FormField
                                id="enrollmentNo"
                                title="Enrollment No"
                                textHolder="123456"
                                fieldValue={formData.enrollmentNo}
                                onChangeFunc={handleChange}
                            />

                            {/* Obtained Marks */}
                            <FormField
                                id="obtainedMarks"
                                title="Obtained Marks"
                                textHolder="455"
                                fieldValue={formData.obtainedMarks}
                                onChangeFunc={handleChange}
                            />
                            {/* Total Marks */}
                            <FormField
                                id="totalMarks"
                                title="Total Marks"
                                textHolder="500"
                                fieldValue={formData.totalMarks}
                                onChangeFunc={handleChange}
                            />
                        </div>
                        {/* Session */}
                        <FormField
                            id="session"
                            title="Session"
                            textHolder="MAR. 2025"
                            fieldValue={formData.session}
                            onChangeFunc={handleChange}
                        />
                    </>
                }

                {/* Other */}
                {formData.documentType === "OTHER" &&
                    <>
                        {/* Document Name */}
                        <FormField
                            id="documentName"
                            title="Document Name"
                            textHolder="Enter document name"
                            fieldValue={formData.documentName}
                            onChangeFunc={handleChange}
                        />
                        {/* Id No */}
                        <FormField
                            id="idNo"
                            title="Id No."
                            textHolder="Enter id no"
                            fieldValue={formData.idNo}
                            onChangeFunc={handleChange}
                        />
                        {/* Session */}
                        <FormField
                            id="session"
                            title="Session"
                            textHolder="MAR. 2025"
                            fieldValue={formData.session}
                            onChangeFunc={handleChange}
                        />
                    </>
                }

                {/* Document Link */}
                <FormField
                    id="documentLink"
                    title="Document Link"
                    textHolder="Enter document link"
                    fieldValue={formData.documentLink}
                    onChangeFunc={handleChange}
                />
                {/* Add Button */}
                <Btn btnType="submit" text="Add Document" />
            </form>
        </>
    );
};