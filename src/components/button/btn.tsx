import clsx from "clsx";
import Spinner from "../ui/spinner";

export type BtnType = "button" | "reset" | "submit";

export default function Btn({
    text = "Click here!",
    btnType = "button",
    isLoading = false,
    btnDisabled = false,
    className = "bg-blue-500 hover:bg-blue-500/90 disabled:bg-blue-500/90 text-white",
    spinnerClassName,
    handleClick,
}: {
    text?: string,
    btnType?: BtnType,
    isLoading?: boolean,
    btnDisabled?: boolean,
    className?: string,
    spinnerClassName?: string,
    handleClick?: (() => void) | (() => Promise<void>),
}) {
    return (
        <>
            <button
                type={btnType}
                disabled={isLoading ? true : btnDisabled}
                onClick={handleClick}
                className={clsx("font-sans w-full text-sm font-semibold py-2 rounded-xl hover:cursor-pointer  duration-300 ease-out outline-none disabled:cursor-not-allowed", className)}>
                {isLoading ? <div className="flex justify-center items-center w-full"><Spinner className={spinnerClassName} customize={true} /></div> : text}
            </button>
        </>
    );
};