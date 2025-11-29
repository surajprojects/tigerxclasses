import clsx from "clsx";
import type { ChangeEvent } from "react";

export default function FormField({
    id = "name",
    title = "Name",
    isRequired = true,
    fieldType = "text",
    isTextHolder = true,
    textHolder = "Enter your name",
    fieldValue,
    showMessage = false,
    isSuccess = true,
    removeBorder = false,
    msgSuccess = "Alright! Username available!",
    msgError = "Oops! Username already taken!",
    onChangeFunc,
}: {
    id?: string,
    title?: string,
    isRequired?: boolean,
    fieldType?: string,
    isTextHolder?: boolean,
    textHolder?: string,
    fieldValue: string | number,
    showMessage?: boolean,
    isSuccess?: boolean,
    msgSuccess?: string,
    msgError?: string,
    removeBorder?: boolean,
    onChangeFunc: (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
}) {
    return (
        <>
            {
                isTextHolder ?
                    <div className="flex flex-col my-2">
                        <label htmlFor={id} className="font-sans font-medium text-sm text-gray-800">{title}{isRequired && "*"}</label>
                        <input
                            type={fieldType}
                            name={id}
                            id={id}
                            value={fieldValue}
                            onChange={onChangeFunc}
                            placeholder={textHolder}
                            required={isRequired}
                            className={clsx("border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out", removeBorder ? "border-none border-white shadow-sm" : "")}
                        />
                        {showMessage && (isSuccess ?
                            <p className="my-0.5 mx-1.5 text-sm text-green-500">{msgSuccess}</p>
                            :
                            <p className="my-0.5 mx-1.5 text-sm italic text-red-500">{msgError}</p>)
                        }
                    </div>
                    :
                    <div className="flex flex-col my-2">
                        <label htmlFor={id} className="font-sans font-medium text-sm text-gray-600">{title}{isRequired && "*"}</label>
                        <input
                            type={fieldType}
                            name={id}
                            id={id}
                            value={fieldValue}
                            onChange={onChangeFunc}
                            required={isRequired}
                            className={clsx("border border-gray-300 font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out", removeBorder ? "border-none border-white shadow-sm" : "")}
                        />
                        {showMessage && (isSuccess ?
                            <p className="mt-2 text-sm text-green-600 dark:text-green-500">{msgSuccess}</p>
                            :
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{msgError}</p>)
                        }
                    </div>
            }
        </>
    );
};