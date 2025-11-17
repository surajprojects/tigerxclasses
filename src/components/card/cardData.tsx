export default function CardData({
    fieldName = "Field Name",
    fieldValue = "Field Value",
}: {
    fieldName?: string,
    fieldValue?: string,
}) {
    return (
        <>
            <div>
                <p className="text-gray-500 capitalize">{fieldName}</p>
                <p className="text-gray-800 font-semibold text-lg">{fieldValue ? fieldValue : "-"}</p>
            </div>
        </>
    );
};