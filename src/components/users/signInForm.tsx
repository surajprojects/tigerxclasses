"use client"

import Btn from "../button/btn";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import FormField from "../form/formField";
import FormHeader from "../form/formHeader";
import FormAction from "../form/formAction";
import { useState, type ChangeEvent } from "react";
import { UserFormInput } from "@/utils/validators/userInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignInForm() {
    const initialData: Pick<UserFormInput, "username" | "password"> = {
        username: "",
        password: "",
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState(initialData);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const fieldValue = evt.target.value;

        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: fieldValue
            };
        });
    };

    const handleSubmit = async () => {
        const result = await signIn("credentials", {
            redirect: false,
            username: formData.username,
            password: formData.password,
        });
        setFormData(initialData);
        if (result?.error) {
            toast.error("Invalid username or password!!!");
        } else {
            toast.success("Login successful!!!");
            window.location.href = "/dashboard";
        }
    };

    return (
        <>
            <section className="w-full h-full p-5">
                <div className="rounded-2xl border border-gray-200 p-6 w-fit mx-auto shadow-xl">
                    <FormHeader
                        description="Sign in to manage your students and courses"
                    />
                    {/* Sign In Form */}
                    <form onSubmit={async (evt) => {
                        setIsLoading(true);
                        evt.preventDefault();
                        await handleSubmit();
                        setIsLoading(false);
                    }}
                        className="max-w-sm sm:w-sm mt-8"
                    >
                        {/* Username */}
                        <FormField
                            id="username"
                            title="Username"
                            textHolder="john123"
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
                        {/* Button */}
                        <Btn btnType="submit" text="Sign In" isLoading={isLoading} btnDisabled={isLoading} />
                        <div className="flex justify-center items-center mt-2">
                            <FormAction linkTo="/signup" />
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};