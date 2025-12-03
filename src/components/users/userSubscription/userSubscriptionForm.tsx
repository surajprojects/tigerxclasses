import Btn from "@/components/button/btn";
import { ChangeEvent, useState } from "react";
import FormField from "@/components/form/formField";
import { SubscriptionPlan } from "@/db/generated/prisma";
import { UserSubscriptionFormData } from "@/utils/types/subscriptionType";
import { UserSubscriptionInput, UserSubscriptionInputEdit } from "@/utils/validators/userSubscriptionInput";

export default function UserSubscriptionForm({
    btnText = "Submit",
    handleSubmit,
    handleEditSubmit,
    initialData = {
        name: "",
        amount: "",
        plan: "",
        startedOn: new Date().toISOString().split("T")[0],
        expiresOn: "",
        remarks: "",
    },
}: {
    btnText?: string,
    handleSubmit?: (data: UserSubscriptionInput) => Promise<void>,
    handleEditSubmit?: (data: UserSubscriptionInputEdit) => Promise<void>,
    initialData?: UserSubscriptionFormData,
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
                    if (!Object.values(SubscriptionPlan).includes(formData.plan as SubscriptionPlan)) {
                        throw new Error("Invalid subscription plan");
                    }
                    setIsLoading(true);
                    const newFormData = {
                        ...formData,
                        plan: formData.plan as SubscriptionPlan,
                        amount: Number(formData.amount),
                    };
                    // Handle submit function
                    handleSubmit && await handleSubmit(newFormData);
                    // Handle edit submit function
                    handleEditSubmit && await handleEditSubmit(newFormData);
                    setIsLoading(false);
                    setFormData(initialData);
                }}
                className="w-full">
                {/* Subscription Name */}
                <FormField
                    id="name"
                    title="Subscription Name"
                    textHolder="Enter subscription name"
                    fieldValue={formData.name}
                    onChangeFunc={handleChange}
                />
                {/* Subscription Plan */}
                <div className="flex flex-col my-2">
                    <label htmlFor="plan" className="font-sans font-medium text-sm text-gray-800">Subscription Plan*</label>
                    <select
                        id="plan"
                        name="plan"
                        value={formData.plan}
                        onChange={handleChange}
                        className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                        <option value="" disabled>Select Plan</option>
                        {[...Object.values(SubscriptionPlan)].map((opt, idx) => {
                            return <option key={idx} value={opt}>{opt}</option>
                        })}
                    </select>
                </div>
                {/* Amount */}
                <div className="flex flex-col my-2">
                    <label htmlFor="amount" className="font-sans font-medium text-sm text-gray-800">Amount*</label>
                    <input
                        type="text"
                        name="amount"
                        id="amount"
                        placeholder="999"
                        inputMode="numeric"
                        maxLength={8}
                        value={formData.amount}
                        onChange={(e) => {
                            const amountValue = e.target.value.replace(/\D/g, "");
                            setFormData((prevData) => {
                                return {
                                    ...prevData,
                                    amount: amountValue,
                                };
                            });
                        }}
                        className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-1">
                    {/* Start Date */}
                    <FormField
                        id="startedOn"
                        title="Start Date"
                        fieldType="date"
                        fieldValue={formData.startedOn}
                        onChangeFunc={handleChange}
                    />
                    {/* End Date */}
                    <FormField
                        id="expiresOn"
                        title="End Date"
                        fieldType="date"
                        fieldValue={formData.expiresOn}
                        onChangeFunc={handleChange}
                    />
                </div>
                {/* Remarks */}
                <FormField
                    id="remarks"
                    title="Remarks"
                    textHolder="Enter remarks"
                    fieldValue={formData.remarks}
                    onChangeFunc={handleChange}
                    isRequired={false}
                />
                {/* Add Button */}
                <Btn btnType="submit" text={btnText} isLoading={isLoading} />
            </form >
        </>
    );
};