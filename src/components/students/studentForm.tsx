import { ChangeEvent, useState } from "react";
import FormField from "../form/formField";
import Btn from "../button/btn";
import Link from "next/link";

export default function StudentForm() {
    const [formData, setFormData] = useState({
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
            <form>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Personal Information</h5>
                    <p className="text-gray-500 mt-1">Basic student details</p>
                    <ul className="grid grid-cols-2 gap-x-6">
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
                            <label htmlFor="gender" className="font-sans font-medium text-sm text-gray-800">Gender</label>
                            <select name="gender" id="gender" className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out">
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </div>
                        {/* Category */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="category" className="font-sans font-medium text-sm text-gray-800">Category</label>
                            <select name="category" id="category" className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out">
                                <option value="ST">ST</option>
                                <option value="SC">SC</option>
                                <option value="OBC">OBC</option>
                                <option value="GEN">GEN</option>
                            </select>
                        </div>
                        {/* Mobile No */}
                        <FormField
                            id="mobileNo"
                            title="Mobile No."
                            textHolder="1234567890"
                            fieldValue={formData.mobileNo}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* Email */}
                        <FormField
                            id="email"
                            fieldType="email"
                            title="Email"
                            textHolder="example@gmail.com"
                            fieldValue={formData.email}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Address Information</h5>
                    <p className="text-gray-500 mt-1">Student address details</p>
                    <ul className="grid grid-cols-2 gap-x-6">
                        {/* Flat/House/Building */}
                        <FormField
                            id="flatHouseBuilding"
                            title="Flat/House/Building"
                            textHolder="117/Kha Salapura"
                            fieldValue={formData.address.flatHouseBuilding}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* Street/Area */}
                        <FormField
                            id="streetOrArea"
                            title="Street/Area"
                            textHolder="Pali Road Salapura"
                            fieldValue={formData.address.streetOrArea}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* Landmark */}
                        <FormField
                            id="landmark"
                            title="Landmark"
                            textHolder="Near Apollo Hospital"
                            fieldValue={formData.address.landmark}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* City */}
                        <FormField
                            id="city"
                            title="City"
                            textHolder="Sheopur"
                            fieldValue={formData.address.city}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* State */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="state" className="font-sans font-medium text-sm text-gray-800">State</label>
                            <select name="state" id="state" className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out">
                                <option value="MP">Madhya Pradesh</option>
                            </select>
                        </div>
                        {/* Pincode */}
                        <FormField
                            id="pincode"
                            title="PIN Code"
                            textHolder="476337"
                            fieldValue={formData.address.pincode}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Family Information</h5>
                    <p className="text-gray-500 mt-1">Parent and guardian details</p>
                    <ul className="my-6 gap-3 grid grid-cols-2">
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
                        <FormField
                            id="parentGuardianMobileNo1"
                            title="Parent/Guardian Mobile No. 1"
                            textHolder="1234567890"
                            fieldValue={formData.parentGuardianMobileNo1}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* Parent/Guardian Mobile No. 2 */}
                        <FormField
                            id="parentGuardianMobileNo2"
                            title="Parent/Guardian Mobile No. 2"
                            textHolder="1234567890"
                            fieldValue={formData.parentGuardianMobileNo2}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Academic Information</h5>
                    <p className="text-gray-500 mt-1">Student's current academic details</p>
                    <ul className="my-6 gap-3 grid grid-cols-2">
                        {/* Class */}
                        <FormField
                            id="class"
                            title="Class"
                            textHolder="12th"
                            fieldValue={formData.class}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                        {/* Institute */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="institute" className="font-sans font-medium text-sm text-gray-800">Institute</label>
                            <select name="institute" id="institute" className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out">
                                <option value="SCHOOl">SCHOOL</option>
                                <option value="COLLEGE">COLLEGE</option>
                                <option value="UNIVERSITY">UNIVERSITY</option>
                                <option value="OTHER">OTHER</option>
                                <option value="NONE">NONE</option>
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
                        />
                        {/* Session */}
                        <FormField
                            id="session"
                            title="Session"
                            textHolder="MAY 2025 - JUN 2026"
                            fieldValue={formData.session}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                        />
                    </ul>
                </div>
                {/* Buttons */}
                <div className="flex items-center">
                    <div className="w-24">
                        <Btn btnType="submit" text="Submit" />
                    </div>
                    <Link href="/" className="font-sans text-black hover:text-white text-sm font-semibold px-3 py-2 rounded-xl cursor-pointer outline-none mx-3 border border-gray-300 hover:bg-red-500 duration-300 ease-out">Cancel</Link>
                </div>
            </form>
        </>
    );
};