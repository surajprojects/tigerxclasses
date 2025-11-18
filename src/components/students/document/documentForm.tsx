import Btn from "@/components/button/btn";
import { ChangeEvent, useState } from "react";
import FormField from "@/components/form/formField";
import { DocumentType } from "@/db/generated/prisma";

export default function DocumentForm() {
    const [formData, setFormData] = useState({
        documentType: "AADHAAR",
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
                    <label htmlFor="documentType" className="font-sans font-medium text-sm text-gray-800">Document Type*</label>
                    <select
                        id="documentType"
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                        className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out"
                    >
                        {[...Object.values(DocumentType)].map((opt, idx) => {
                            return <option key={idx} value={opt}>{opt}</option>
                        })}
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
                        isRequired={formData.documentType === "AADHAAR" ? true : false}
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
                            isRequired={((formData.documentType === "SECONDARY") || (formData.documentType === "HIGHERSECONDARY") || (formData.documentType === "GRADUATION") || (formData.documentType === "POSTGRADUATION")) ? true : false}
                        />
                        <div className="grid grid-cols-2 gap-x-4">
                            {/* Roll No */}
                            <FormField
                                id="rollNo"
                                title="Roll No"
                                textHolder="123456"
                                fieldValue={formData.rollNo}
                                onChangeFunc={handleChange}
                                isRequired={((formData.documentType === "SECONDARY") || (formData.documentType === "HIGHERSECONDARY") || (formData.documentType === "GRADUATION") || (formData.documentType === "POSTGRADUATION")) ? true : false}
                            />
                            {/* Enrollment No */}
                            <FormField
                                id="enrollmentNo"
                                title="Enrollment No"
                                textHolder="123456"
                                fieldValue={formData.enrollmentNo}
                                onChangeFunc={handleChange}
                                isRequired={((formData.documentType === "SECONDARY") || (formData.documentType === "HIGHERSECONDARY") || (formData.documentType === "GRADUATION") || (formData.documentType === "POSTGRADUATION")) ? true : false}
                            />
                            {/* Obtained Marks */}
                            <FormField
                                id="obtainedMarks"
                                title="Obtained Marks"
                                textHolder="455"
                                fieldValue={formData.obtainedMarks}
                                onChangeFunc={handleChange}
                                isRequired={false}
                            />
                            {/* Total Marks */}
                            <FormField
                                id="totalMarks"
                                title="Total Marks"
                                textHolder="500"
                                fieldValue={formData.totalMarks}
                                onChangeFunc={handleChange}
                                isRequired={false}
                            />
                        </div>
                        {/* Session */}
                        <FormField
                            id="session"
                            title="Session"
                            textHolder="MAR. 2025"
                            fieldValue={formData.session}
                            onChangeFunc={handleChange}
                            isRequired={false}
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
                            isRequired={formData.documentType === "OTHER" ? true : false}
                        />
                        {/* Id No */}
                        <FormField
                            id="idNo"
                            title="Id No."
                            textHolder="Enter id no"
                            fieldValue={formData.idNo}
                            onChangeFunc={handleChange}
                            isRequired={formData.documentType === "OTHER" ? true : false}
                        />
                        {/* Session */}
                        <FormField
                            id="session"
                            title="Session"
                            textHolder="MAR. 2025"
                            fieldValue={formData.session}
                            onChangeFunc={handleChange}
                            isRequired={false}
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
                    isRequired={false}
                />
                {/* Add Button */}
                <Btn btnType="submit" text="Add Document" />
            </form>
        </>
    );
};