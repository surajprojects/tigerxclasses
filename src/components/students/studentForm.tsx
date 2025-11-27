import Btn from "../button/btn";
import FormField from "../form/formField";
import CancelBtn from "../button/cancelBtn";
import { ChangeEvent, useState } from "react";
import { StudentFormData } from "@/utils/types/studentType";
import { Category, Gender, Institute, State } from "@/db/generated/prisma";
import { StudentFormInput, StudentFormInputEdit } from "@/utils/validators/studentInput";

export default function StudentForm({
    handleSubmit,
    handleEditSubmit,
    initialData = {
        fullName: "",
        dob: "",
        gender: "",
        category: "",
        mobileNo: "",
        email: "",
        address: {
            flatHouseBuilding: "",
            streetOrArea: "",
            landmark: "",
            city: "",
            state: "",
            pincode: "",
        },
        fatherName: "",
        motherName: "",
        parentGuardianMobileNo1: "",
        parentGuardianMobileNo2: "",
        class: "",
        institute: "",
        instituteName: "",
        session: "",
        remarks: "",
    },
}: {
    handleSubmit?: (data: StudentFormInput) => Promise<void>,
    handleEditSubmit?: (data: StudentFormInputEdit) => Promise<void>,
    initialData?: Omit<StudentFormData, "rollNo">,
}) {
    const [formData, setFormData] = useState(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const changedValue = evt.target.value;
        const keys = fieldName.split(".");

        setFormData((prevData) => {
            if (keys.length === 1) {
                return {
                    ...prevData,
                    [fieldName]: changedValue,
                }
            }

            return {
                ...prevData,
                address: {
                    ...prevData.address,
                    [keys[1]]: changedValue,
                }
            }
        });
    };
    return (
        <>
            <form
                onSubmit={async (evt) => {
                    evt.preventDefault();
                    if (!Object.values(Gender).includes(formData.gender as Gender)) {
                        throw new Error("Invalid gender");
                    }
                    if (!Object.values(Category).includes(formData.category as Category)) {
                        throw new Error("Invalid category");
                    }
                    if (!Object.values(State).includes(formData.address.state as State)) {
                        throw new Error("Invalid state");
                    }
                    if (!Object.values(Institute).includes(formData.institute as Institute)) {
                        throw new Error("Invalid institute");
                    }
                    setIsLoading(true);
                    const newFormData = {
                        ...formData,
                        gender: formData.gender as Gender,
                        category: formData.category as Category,
                        institute: formData.institute as Institute,
                        address: {
                            ...formData.address,
                            state: formData.address.state as State,
                        },
                    };
                    // Handle submit function
                    handleSubmit && await handleSubmit(newFormData);
                    // Handle edit submit function
                    handleEditSubmit && await handleEditSubmit(newFormData);
                    setIsLoading(false);
                    setFormData(initialData);
                }}
            >
                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Personal Information</h5>
                    <p className="text-gray-500 mt-1">Basic student details</p>
                    <div className="grid grid-cols-2 gap-x-6">
                        {/* Full Name */}
                        <FormField
                            id="fullName"
                            title="Full Name"
                            textHolder="Enter full name"
                            fieldValue={formData.fullName}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* Date of Birth */}
                        <FormField
                            id="dob"
                            title="Date of Birth"
                            fieldType="date"
                            fieldValue={formData.dob}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* Gender */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="gender" className="font-sans font-medium text-sm text-gray-800">Gender*</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                                <option value="" disabled>Select Gender</option>
                                {[...Object.values(Gender)].map((opt, idx) => {
                                    return <option key={idx} value={opt}>{opt}</option>
                                })}
                            </select>
                        </div>
                        {/* Category */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="category" className="font-sans font-medium text-sm text-gray-800">Category*</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                                <option value="" disabled>Select Category</option>
                                {[...Object.values(Category)].map((opt, idx) => {
                                    return <option key={idx} value={opt}>{opt}</option>
                                })}
                            </select>
                        </div>
                        {/* Mobile No */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="mobileNo" className="font-sans font-medium text-sm text-gray-800">Mobile No.*</label>
                            <input
                                type="text"
                                name="mobileNo"
                                id="mobileNo"
                                placeholder="1234567890"
                                inputMode="numeric"
                                maxLength={10}
                                value={formData.mobileNo}
                                onChange={(e) => {
                                    const mobileNoValue = e.target.value.replace(/\D/g, "");
                                    setFormData((prevData) => {
                                        return {
                                            ...prevData,
                                            mobileNo: mobileNoValue,
                                        };
                                    });
                                }}

                                className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-none border-white shadow-sm"
                            />
                        </div>
                        {/* Email */}
                        <FormField
                            id="email"
                            fieldType="email"
                            title="Email"
                            textHolder="example@gmail.com"
                            fieldValue={formData.email}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                            isRequired={false}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Address Information</h5>
                    <p className="text-gray-500 mt-1">Student address details</p>
                    <div className="grid grid-cols-2 gap-x-6">
                        {/* Flat/House/Building */}
                        <FormField
                            id="address.flatHouseBuilding"
                            title="Flat/House/Building"
                            textHolder="117/Kha Salapura"
                            fieldValue={formData.address.flatHouseBuilding}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                            isRequired={false}
                        />
                        {/* Street/Area */}
                        <FormField
                            id="address.streetOrArea"
                            title="Street/Area"
                            textHolder="Pali Road Salapura"
                            fieldValue={formData.address.streetOrArea}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* Landmark */}
                        <FormField
                            id="address.landmark"
                            title="Landmark"
                            textHolder="Near Apollo Hospital"
                            fieldValue={formData.address.landmark}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                            isRequired={false}
                        />
                        {/* City */}
                        <FormField
                            id="address.city"
                            title="City"
                            textHolder="Sheopur"
                            fieldValue={formData.address.city}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* State */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="address.state" className="font-sans font-medium text-sm text-gray-800">State*</label>
                            <select
                                id="address.state"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleChange}
                                className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                                <option value="" disabled>Select State</option>
                                {[...Object.values(State)].map((opt, idx) => {
                                    return <option key={idx} value={opt}>{opt}</option>
                                })}
                            </select>
                        </div>
                        {/* Pincode */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="pincode" className="font-sans font-medium text-sm text-gray-800">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                id="pincode"
                                placeholder="123456"
                                inputMode="numeric"
                                maxLength={6}
                                value={formData.address.pincode}
                                onChange={(e) => {
                                    const pincodeValue = e.target.value.replace(/\D/g, "");
                                    setFormData((prevData) => {
                                        return {
                                            ...prevData,
                                            address: {
                                                ...prevData.address,
                                                pincode: pincodeValue,
                                            }
                                        };
                                    });
                                }}

                                className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-none border-white shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Family Information</h5>
                    <p className="text-gray-500 mt-1">Parent and guardian details</p>
                    <div className="grid grid-cols-2 gap-x-6">
                        {/* Father Name */}
                        <FormField
                            id="fatherName"
                            title="Father Name"
                            textHolder="Enter father name"
                            fieldValue={formData.fatherName}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* mother Name */}
                        <FormField
                            id="motherName"
                            title="mother Name"
                            textHolder="Enter mother name"
                            fieldValue={formData.motherName}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* Parent/Guardian Mobile No 1 */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="parentGuardianMobileNo1" className="font-sans font-medium text-sm text-gray-800">Parent/Guardian Mobile No. 1</label>
                            <input
                                type="text"
                                name="parentGuardianMobileNo1"
                                id="parentGuardianMobileNo1"
                                placeholder="1234567890"
                                inputMode="numeric"
                                maxLength={10}
                                value={formData.parentGuardianMobileNo1}
                                onChange={(e) => {
                                    const parentGuardianMobileNo1Value = e.target.value.replace(/\D/g, "");
                                    setFormData((prevData) => {
                                        return {
                                            ...prevData,
                                            parentGuardianMobileNo1: parentGuardianMobileNo1Value,
                                        };
                                    });
                                }}

                                className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-none border-white shadow-sm"
                            />
                        </div>
                        {/* Parent/Guardian Mobile No. 2 */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="parentGuardianMobileNo2" className="font-sans font-medium text-sm text-gray-800">Parent/Guardian Mobile No. 2</label>
                            <input
                                type="text"
                                name="parentGuardianMobileNo2"
                                id="parentGuardianMobileNo2"
                                placeholder="1234567890"
                                inputMode="numeric"
                                maxLength={10}
                                value={formData.parentGuardianMobileNo2}
                                onChange={(e) => {
                                    const parentGuardianMobileNo2Value = e.target.value.replace(/\D/g, "");
                                    setFormData((prevData) => {
                                        return {
                                            ...prevData,
                                            parentGuardianMobileNo2: parentGuardianMobileNo2Value,
                                        };
                                    });
                                }}

                                className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-none border-white shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Academic Information</h5>
                    <p className="text-gray-500 mt-1">Student's current academic details</p>
                    <div className="grid grid-cols-2 gap-x-6">
                        {/* Class */}
                        <FormField
                            id="class"
                            title="Class"
                            textHolder="12th"
                            fieldValue={formData.class}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                            isRequired={false}
                        />
                        {/* Institute */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="institute" className="font-sans font-medium text-sm text-gray-800">Institute*</label>
                            <select
                                id="institute"
                                name="institute"
                                value={formData.institute}
                                onChange={handleChange}
                                className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                                <option value="" disabled>Select Institute</option>
                                {[...Object.values(Institute)].map((opt, idx) => {
                                    return <option key={idx} value={opt}>{opt}</option>
                                })}
                            </select>
                        </div>
                        {/* Institute Name */}
                        <FormField
                            id="instituteName"
                            title="Institute Name"
                            textHolder="Govt.H.S.Excellence School"
                            fieldValue={formData.instituteName}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                            isRequired={false}
                        />
                        {/* Session */}
                        <FormField
                            id="session"
                            title="Session"
                            textHolder="MAY 2025 - JUN 2026"
                            fieldValue={formData.session}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                            isRequired={false}
                        />
                    </div>
                    {/* Remarks */}
                    <FormField
                        id="remarks"
                        title="Remarks"
                        textHolder="Enter remarks"
                        fieldValue={formData.remarks}
                        onChangeFunc={handleChange}
                        removeBorder={true}
                        isRequired={false}
                    />
                </div>
                {/* Buttons */}
                <div className="flex items-center">
                    <div className="w-24">
                        <Btn btnType="submit" text={handleEditSubmit ? "Update" : "Submit"} isLoading={isLoading} />
                    </div>
                    <CancelBtn />
                </div>
            </form >
        </>
    );
};