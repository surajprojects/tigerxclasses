import clsx from "clsx";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function Card({
    title = "Total Students",
    data = "145",
    description = "+12% from last month",
    className,
    children,
}: {
    title?: string,
    data?: string,
    description?: string,
    className?: string,
    children?: React.ReactNode,
}) {
    return (
        <>
            <div className="rounded-xl bg-white p-5 border border-gray-50 shadow-sm w-full">
                <div className="mb-8 flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-500 mr-14">{title}</p>
                    <div className={clsx("p-2.5 rounded-2xl", className ? className : "bg-blue-50 text-blue-500")}>
                        {children ? children : <UsersIcon className="size-6" />}
                    </div>
                </div>
                <p className="text-4xl font-bold text-gray-700 my-2">{data}</p>
                <p className="text-sm text-green-500">{description}</p>
            </div >
        </>
    );
};