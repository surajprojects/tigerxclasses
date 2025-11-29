import Btn from "@/components/button/btn";
import { ChangeEvent, useState } from "react";
import FormField from "@/components/form/formField";
import { DocumentType, Institute } from "@/db/generated/prisma";
import { StudentDocumentInput } from "@/utils/validators/studentDocumentInput";
import { StudentCourseInputEdit } from "@/utils/validators/studentCourseInput";

export default function DocumentForm({
    btnText = "Submit",
    handleSubmit,
    handleEditSubmit,
    initialData = {
        documentType: "AADHAAR",
        documentName: "",
        institute: "GOVT",
        instituteName: "",
        aadhaarNo: "",
        idNo: "",
        rollNo: "",
        enrollmentNo: "",
        session: "",
        obtainedMarks: "",
        totalMarks: "",
        documentLink: "",
    },
}: {
    btnText?: string,
    handleSubmit?: (data: StudentDocumentInput) => Promise<void>,
    handleEditSubmit?: (data: StudentCourseInputEdit) => Promise<void>,
    initialData?: Required<StudentDocumentInput>,
}) {
    const instituteData = {
        AADHAAR: "GOVT",
        SECONDARY: "SCHOOL",
        HIGHERSECONDARY: "SCHOOL",
        GRADUATION: "COLLEGE",
        POSTGRADUATION: "COLLEGE",
        OTHER: "OTHER",
    } as const;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState(initialData);

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const changedValue = evt.target.value;

        setFormData((prevData) => {
            if (fieldName === "documentType") {
                return {
                    ...prevData,
                    [fieldName]: changedValue as DocumentType,
                    institute: instituteData[changedValue as keyof typeof instituteData],
                };
            }
            else {
                return {
                    ...prevData,
                    [fieldName]: changedValue,
                };
            }
        });
    };

    return (
        <>
            <form
                onSubmit={async (evt) => {
                    evt.preventDefault();
                    if (!Object.values(Institute).includes(formData.institute as Institute)) {
                        throw new Error("Invalid institute");
                    }
                    if (!Object.values(DocumentType).includes(formData.documentType as DocumentType)) {
                        throw new Error("Invalid document type");
                    }
                    setIsLoading(true);
                    const newFormData = {
                        ...formData,
                        institute: formData.institute as Institute,
                        documentType: formData.documentType as DocumentType,
                    };
                    // Handle submit function
                    handleSubmit && await handleSubmit(newFormData);
                    // Handle edit submit function
                    handleEditSubmit && await handleEditSubmit(newFormData);
                    setIsLoading(false);
                    setFormData(initialData);
                }}
                className="w-full">
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
                    <div className="flex flex-col my-2">
                        <label htmlFor="aadhaarNo" className="font-sans font-medium text-sm text-gray-800">Aadhaar No.*</label>
                        <input
                            type="text"
                            name="aadhaarNo"
                            id="aadhaarNo"
                            placeholder="1234 5678 9012"
                            inputMode="numeric"
                            maxLength={12}
                            value={formData.aadhaarNo}
                            onChange={(e) => {
                                const aadhaarNoValue = e.target.value.replace(/\D/g, "");
                                setFormData((prevData) => {
                                    return {
                                        ...prevData,
                                        aadhaarNo: aadhaarNoValue,
                                    };
                                });
                            }}
                            required={formData.documentType === "AADHAAR" ? true : false}
                            className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-gray-300"
                        />
                    </div>
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
                            <div className="flex flex-col my-2">
                                <label htmlFor="rollNo" className="font-sans font-medium text-sm text-gray-800">Roll No.*</label>
                                <input
                                    type="text"
                                    name="rollNo"
                                    id="rollNo"
                                    placeholder="12345678"
                                    inputMode="numeric"
                                    maxLength={12}
                                    value={formData.rollNo}
                                    onChange={(e) => {
                                        const rollNoValue = e.target.value.replace(/\D/g, "");
                                        setFormData((prevData) => {
                                            return {
                                                ...prevData,
                                                rollNo: rollNoValue,
                                            };
                                        });
                                    }}
                                    required={((formData.documentType === "SECONDARY") || (formData.documentType === "HIGHERSECONDARY") || (formData.documentType === "GRADUATION") || (formData.documentType === "POSTGRADUATION")) ? true : false}
                                    className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-gray-300"
                                />
                            </div>
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
                            <div className="flex flex-col my-2">
                                <label htmlFor="obtainedMarks" className="font-sans font-medium text-sm text-gray-800">Obtained Marks</label>
                                <input
                                    type="text"
                                    name="obtainedMarks"
                                    id="obtainedMarks"
                                    placeholder="450"
                                    inputMode="numeric"
                                    maxLength={8}
                                    value={formData.obtainedMarks}
                                    onChange={(e) => {
                                        const obtainedMarksValue = e.target.value.replace(/\D/g, "");
                                        setFormData((prevData) => {
                                            return {
                                                ...prevData,
                                                obtainedMarks: obtainedMarksValue,
                                            };
                                        });
                                    }}
                                    required={false}
                                    className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-gray-300"
                                />
                            </div>
                            {/* Total Marks */}
                            <div className="flex flex-col my-2">
                                <label htmlFor="totalMarks" className="font-sans font-medium text-sm text-gray-800">Total Marks</label>
                                <input
                                    type="text"
                                    name="totalMarks"
                                    id="totalMarks"
                                    placeholder="500"
                                    inputMode="numeric"
                                    maxLength={8}
                                    value={formData.totalMarks}
                                    onChange={(e) => {
                                        const totalMarksValue = e.target.value.replace(/\D/g, "");
                                        setFormData((prevData) => {
                                            return {
                                                ...prevData,
                                                totalMarks: totalMarksValue,
                                            };
                                        });
                                    }}
                                    required={false}
                                    className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-gray-300"
                                />
                            </div>
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
                <Btn btnType="submit" text={btnText} isLoading={isLoading} />
            </form>
        </>
    );
};