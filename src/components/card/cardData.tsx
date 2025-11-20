import clsx from "clsx"

export default function CardData({
    fieldName = "Field Name",
    fieldValue = "Field Value",
    secondary = false,
    marginX = false,
    capitalize = false,
}: {
    fieldName?: string,
    fieldValue?: string,
    secondary?: boolean,
    marginX?: boolean,
    capitalize?: boolean,
}) {
    return (
        <>
            {secondary ?
                <div className={marginX ? "mx-auto" : ""}>
                    <p className="text-base text-gray-500">{fieldName}</p>
                    <p className="text-lg text-gray-800">{fieldValue ? fieldValue : "-"}</p>
                </div>
                :
                <div className={marginX ? "mx-auto" : ""}>
                    <p className="text-gray-500 text-sm">{fieldName}</p>
                    <p className={clsx("text-gray-800 font-semibold text-base mt-0.5", capitalize && "capitalize")}>{fieldValue ? fieldValue : "-"}</p>
                </div>
            }
        </>
    );
};