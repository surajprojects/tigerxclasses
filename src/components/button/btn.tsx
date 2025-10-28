import Spinner from "../ui/spinner";

export type BtnType = "button" | "reset" | "submit";

export default function Btn({
    text = "Click here!",
    btnType = "button",
    isLoading = false,
    btnDisabled = false,
}: {
    text?: string,
    btnType?: BtnType,
    isLoading?: boolean,
    btnDisabled?: boolean,
}) {
    return (
        <>
            <button type={btnType} disabled={btnDisabled} className="bg-blue-500 font-sans text-white w-full text-sm font-semibold py-2 rounded-xl hover:cursor-pointer hover:bg-blue-500/90 duration-300 ease-out outline-none">{isLoading ? <div className="flex justify-center items-center w-full"><Spinner customize={true} /></div> : text}</button>
        </>
    );
};