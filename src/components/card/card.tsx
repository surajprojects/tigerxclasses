import CardHeader from "./cardHeader";

export default function Card({
    children,
}: {

    children?: React.ReactNode
}) {
    return (
        <>
            <div className="bg-[#f8fafc] font-normal duration-300 ease-out p-6 rounded-2xl my-8 shadow-sm hover:shadow-md">
                {children}
            </div>
        </>
    );
};