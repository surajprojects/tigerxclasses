"use client"

import Btn from "../button/btn";
import { toast } from "react-toastify";
import FormField from "../form/formField";
import FormHeader from "../form/formHeader";
import FormAction from "../form/formAction";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import axiosPublic from "@/utils/axios/axiosPublic";
import { UserFormData } from "@/utils/types/userType";
import { Category, Gender } from "@/db/generated/prisma";
import { errorHandle } from "@/utils/errors/errorHandle";
import { UserFormInput } from "@/utils/validators/userInput";
import { EyeIcon } from "lucide-react";
import { EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignUpForm() {
    const initialData = {
        fullName: "",
        dob: "",
        gender: "",
        category: "",
        mobileNo: "",
        email: "",
        instituteName: "",
        username: "",
        password: "",
        confirmPassword: "",
    };

    const router = useRouter();
    const [formData, setFormData] = useState(initialData);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const fieldValue = evt.target.value;

        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: fieldValue,
            };
        });
    };

    const handleSubmit = async (formData: UserFormInput) => {
        try {
            await axiosPublic.post("/auth/register", formData);
            toast.success("User created successfully!!!");
            router.push("/");
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };

    return (
        <>
            <section className="w-full h-full p-5">
                <div className="rounded-2xl border border-gray-200 p-6 w-fit mx-auto shadow-xl">
                    <FormHeader
                        title="Create Account"
                        description="Register to get started with student management"
                    />
                    {/* Sign In Form */}
                    <form onSubmit={async (evt) => {
                        evt.preventDefault();
                        if (!Object.values(Gender).includes(formData.gender as Gender)) {
                            throw new Error("Invalid gender");
                        }
                        if (!Object.values(Category).includes(formData.category as Category)) {
                            throw new Error("Invalid category");
                        }
                        setIsLoading(true);
                        if (formData.password === formData.confirmPassword) {
                            setShowMessage(false);
                            const { confirmPassword, ...newFormData } = formData;
                            await handleSubmit({
                                ...newFormData,
                                gender: formData.gender as Gender,
                                category: formData.category as Category,
                            });
                        }
                        else {
                            setShowMessage(true);
                        }
                        setIsLoading(false);
                    }}
                        className="w-md mt-8"
                    >
                        {/* Name */}
                        <FormField
                            id="fullName"
                            title="Full Name"
                            textHolder="John Doe"
                            fieldValue={formData.fullName}
                            onChangeFunc={handleChange}
                        />
                        {/* Date of Birth */}
                        <FormField
                            id="dob"
                            title="Date of Birth"
                            fieldType="date"
                            fieldValue={formData.dob}
                            onChangeFunc={handleChange}
                        />
                        <div className="grid grid-cols-2 gap-x-5">
                            {/* Gender */}
                            <div className="flex flex-col my-2">
                                <label htmlFor="gender" className="font-sans font-medium text-sm text-gray-800">Gender*</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
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
                                    className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                                    <option value="" disabled>Select Category</option>
                                    {[...Object.values(Category)].map((opt, idx) => {
                                        return <option key={idx} value={opt}>{opt}</option>
                                    })}
                                </select>
                            </div>
                            {/* Email */}
                            <FormField
                                id="email"
                                title="Email"
                                fieldType="email"
                                textHolder="your@email.com"
                                fieldValue={formData.email}
                                onChangeFunc={handleChange}
                            />
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

                                    className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-gray-300"
                                />
                            </div>
                        </div>
                        {/* Institute Name */}
                        <FormField
                            id="instituteName"
                            title="Institute Name"
                            textHolder="Tiger Classes"
                            fieldValue={formData.instituteName}
                            onChangeFunc={handleChange}
                        />
                        {/* Username */}
                        <FormField
                            id="username"
                            title="Username"
                            textHolder="johndoe"
                            fieldValue={formData.username}
                            onChangeFunc={handleChange}
                        />
                        {/* Password */}
                        <FormField
                            id="password"
                            title="Password"
                            textHolder="••••••••"
                            fieldType={showPassword ? "text" : "password"}
                            fieldValue={formData.password}
                            onChangeFunc={handleChange}
                        >
                            <button
                                type="button"
                                onClick={() => setShowPassword((prevData) => !prevData)}
                                className="inline px-0.5 cursor-pointer"
                            >
                                {showPassword ? <EyeIcon className="size-4" /> : <EyeSlashIcon className="size-4" />}
                            </button>
                        </FormField>
                        {/* Confirm Password */}
                        <FormField
                            id="confirmPassword"
                            title="Confirm Password"
                            fieldType={showConfirmPassword ? "text" : "password"}
                            textHolder="••••••••"
                            fieldValue={formData.confirmPassword}
                            onChangeFunc={handleChange}
                            showMessage={showMessage}
                            isSuccess={false}
                            msgError="Password doesn't match!"
                        >
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prevData) => !prevData)}
                                className="inline px-0.5 cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeIcon className="size-4" /> : <EyeSlashIcon className="size-4" />}
                            </button>
                        </FormField>
                        {/* Button */}
                        <Btn btnType="submit" text="Sign Up" isLoading={isLoading} btnDisabled={isLoading} />
                        <div className="flex justify-center items-center mt-2">
                            <FormAction
                                text="Already have an account?"
                                linkName="Sign In"
                                linkTo="/" />
                        </div>
                    </form>
                </div>
            </section >
        </>
    );
};