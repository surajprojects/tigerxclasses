import clsx from "clsx";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function Card({
    title = "Total Students",
    data = "145",
    description = "+12% from last month",
    className,
    titleStyle,
    descriptionStyle,
    children,
}: {
    title?: string,
    data?: string,
    description?: string,
    className?: string,
    titleStyle?: string,
    descriptionStyle?: string,
    children?: React.ReactNode,
}) {
    return (
        <>
            <div className="rounded-xl bg-white p-5 border border-gray-50 shadow-sm hover:shadow-md duration-300 ease-out w-full">
                <div className="flex justify-between items-center">
                    <p className="text-base font-semibold text-gray-600">{title}</p>
                    <div className={clsx("p-2.5 rounded-2xl", className ? className : "bg-blue-50 text-blue-500")}>
                        {children ? children : <UsersIcon className="size-6" />}
                    </div>
                </div>
                <p className={clsx("font-bold text-gray-800/90", titleStyle ? titleStyle : "text-4xl my-3 mt-4")}>{data}</p>
                <p className={clsx("text-xs font-medium", descriptionStyle ? descriptionStyle : "text-green-600")}>{description}</p>
            </div >
        </>
    );
};