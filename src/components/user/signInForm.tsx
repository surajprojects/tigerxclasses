import Btn from "../button/btn";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import FormField from "../form/formField";
import FormHeader from "../form/formHeader";
import FormAction from "../form/formAction";
import { useState, type ChangeEvent } from "react";

export default function SignInForm() {
    const initialData = {
        username: "",
        password: "",
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState(initialData);

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
                            fieldType="password"
                            textHolder="••••••••"
                            fieldValue={formData.password}
                            onChangeFunc={handleChange}
                        />
                        {/* Button */}
                        <Btn btnType="submit" text="Sign In" isLoading={isLoading} btnDisabled={isLoading} />
                        <div className="flex justify-center items-center mt-2">
                            <FormAction linkTo="/signup" />
                        </div>
                    </form>
                </div>
            </section >
        </>
    );
};