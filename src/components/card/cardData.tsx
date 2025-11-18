export default function CardData({
    fieldName = "Field Name",
    fieldValue = "Field Value",
    secondary = false,
    marginX = false,
}: {
    fieldName?: string,
    fieldValue?: string,
    secondary?: boolean,
    marginX?: boolean,
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
                    <p className="text-gray-500">{fieldName}</p>
                    <p className="text-gray-800 font-semibold text-lg">{fieldValue ? fieldValue : "-"}</p>
                </div>
            }
        </>
    );
};