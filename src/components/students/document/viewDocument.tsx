import CardData from "@/components/card/cardData";

export default function ViewDocument() {
    return (
        <>
            <div className="mt-4 mx-6 gap-3 grid grid-cols-2 duration-300 ease-out">
                {/* Document Type */}
                <CardData fieldName="Document Type" fieldValue="Aadhaar" />
                {/* Document Name */}
                <CardData fieldName="Document Name" fieldValue="Aadhaar" />
                {/* Institute */}
                <CardData fieldName="Institute" fieldValue="GOVT" />
                {/* Institute Name */}
                <CardData fieldName="Institute Name" fieldValue="Aadhaar Center" />
                {/* Id No */}
                <CardData fieldName="Id No." fieldValue="132456" />
                {/* Roll No */}
                <CardData fieldName="Roll No." fieldValue="1324114" />
                {/* Enrollment No */}
                <CardData fieldName="Enrollment No." fieldValue="1234567" />
                {/* Obtained Marks */}
                <CardData fieldName="Obtained Marks" fieldValue="450" />
                {/* Total Marks */}
                <CardData fieldName="Total Marks" fieldValue="500" />
                {/* Percentage */}
                <CardData fieldName="Percentage" fieldValue="90%" />
                {/* Session */}
                <CardData fieldName="Session" fieldValue="MAY 2025" />
                {/* Created On */}
                <CardData fieldName="Created On" fieldValue="2025-01-01" />
            </div>
        </>
    );
};