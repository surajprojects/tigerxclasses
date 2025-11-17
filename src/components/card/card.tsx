import CardHeader from "./cardHeader";

export default function Card({
    children,
}: {

    children?: React.ReactNode
}) {
    return (
        <>
            <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                {children}
            </div>
        </>
    );
};