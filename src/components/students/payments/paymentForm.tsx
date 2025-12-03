import Btn from "@/components/button/btn";
import { ChangeEvent, useState } from "react";
import FormField from "@/components/form/formField";
import { PaymentMethod } from "@/db/generated/prisma";
import { PaymentFormInput } from "@/utils/validators/paymentInput";

export default function PaymentForm({
    btnText = "Submit",
    handleSubmit,
    initialData = {
        amount: 1,
        method: "CASH",
        date: new Date().toISOString().split("T")[0],
        remarks: "",
    },
}: {
    btnText?: string,
    handleSubmit?: (data: PaymentFormInput) => Promise<void>,
    initialData?: Required<PaymentFormInput>,
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState(initialData);

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const changedValue = evt.target.value;

        setFormData((prevData) => {
            return {
                ...prevData,
                [fieldName]: changedValue,
            };
        });
    };
    return (
        <>
            <form
                onSubmit={async (evt) => {
                    evt.preventDefault();
                    if (!Object.values(PaymentMethod).includes(formData.method as PaymentMethod)) {
                        throw new Error("Invalid payment method");
                    }
                    setIsLoading(true);
                    // Handle submit function
                    handleSubmit && await handleSubmit({
                        ...formData,
                        method: formData.method as PaymentMethod,
                    });
                    setIsLoading(false);
                    setFormData(initialData);
                }}
                className="w-full">
                {/* Method */}
                <div className="flex flex-col my-2">
                    <label htmlFor="method" className="font-sans font-medium text-sm text-gray-800">Method*</label>
                    <select
                        id="method"
                        name="method"
                        value={formData.method}
                        onChange={handleChange}
                        className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer"
                    >
                        {[...Object.values(PaymentMethod)].map((opt, idx) => {
                            return <option key={idx} value={opt}>{opt}</option>
                        })}
                    </select>
                </div>
                {/* Amount */}
                <div className="flex flex-col my-2">
                    <label htmlFor="amount" className="font-sans font-medium text-sm text-gray-800">Amount &#40;&#8377;&#41;*</label>
                    <input
                        type="text"
                        name="amount"
                        id="amount"
                        placeholder="10000"
                        inputMode="numeric"
                        maxLength={10}
                        value={formData.amount}
                        onChange={(e) => {
                            const amountValue = e.target.value.replace(/\D/g, "");
                            setFormData((prevData) => {
                                return {
                                    ...prevData,
                                    amount: Number(amountValue),
                                };
                            });
                        }}
                        className="border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out"
                    />
                </div>
                {/* Date */}
                <FormField
                    id="date"
                    title="Date"
                    fieldType="date"
                    fieldValue={formData.date}
                    onChangeFunc={handleChange}
                />
                {/* Remarks */}
                <FormField
                    id="remarks"
                    title="Remarks"
                    textHolder="E.g. First Installment"
                    fieldValue={formData.remarks ? formData.remarks : ""}
                    onChangeFunc={handleChange}
                    isRequired={false}
                />
                {/* Add Button */}
                <Btn btnType="submit" text={btnText} isLoading={isLoading} />
            </form>
        </>
    );
};