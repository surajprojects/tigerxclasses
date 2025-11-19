import CardData from "@/components/card/cardData";
import { StudentDocumentData } from "@/utils/types/studentDocumentType";

export default function ViewDocument({ studentDocumentData }: { studentDocumentData: StudentDocumentData }) {
    if (studentDocumentData.documentType === "AADHAAR") {
        return (
            <>
                <div className="mt-4 mx-6 gap-3 grid grid-cols-2 duration-300 ease-out">
                    {/* Document Type */}
                    <CardData fieldName="Document Type" fieldValue={studentDocumentData.documentType} />
                    {/* Institute */}
                    <CardData fieldName="Institute" fieldValue={studentDocumentData.institute} />
                    {/* Created On */}
                    <CardData fieldName="Created On" fieldValue={studentDocumentData.createdAt.split("T")[0]} />
                </div>
            </>
        );
    }
    else if ((studentDocumentData.documentType === "SECONDARY") || (studentDocumentData.documentType === "HIGHERSECONDARY") || (studentDocumentData.documentType === "GRADUATION") || (studentDocumentData.documentType === "POSTGRADUATION")) {
        return (
            <>
                <div className="mt-4 mx-6 gap-3 grid grid-cols-2 duration-300 ease-out">
                    {/* Document Type */}
                    <CardData fieldName="Document Type" fieldValue={studentDocumentData.documentType} />
                    {/* Institute */}
                    <CardData fieldName="Institute" fieldValue={studentDocumentData.institute} />
                    {/* Institute Name */}
                    <CardData fieldName="School/College Name" fieldValue={studentDocumentData.instituteName} />
                    {/* Roll No */}
                    <CardData fieldName="Roll No." fieldValue={studentDocumentData.rollNo} />
                    {/* Enrollment No */}
                    <CardData fieldName="Enrollment No." fieldValue={studentDocumentData.enrollmentNo} />
                    {/* Obtained Marks */}
                    <CardData fieldName="Obtained Marks" fieldValue={`${studentDocumentData.obtainedMarks ? studentDocumentData.obtainedMarks : ""}`} />
                    {/* Total Marks */}
                    <CardData fieldName="Total Marks" fieldValue={`${studentDocumentData.totalMarks ? studentDocumentData.totalMarks : ""}`} />
                    {/* Percentage */}
                    <CardData fieldName="Percentage" fieldValue={`${(studentDocumentData.obtainedMarks && studentDocumentData.totalMarks) ? `${(studentDocumentData.obtainedMarks / studentDocumentData.totalMarks * 100)}%` : ""}`} />
                    {/* Session */}
                    <CardData fieldName="Session" fieldValue={studentDocumentData.session} />
                    {/* Created On */}
                    <CardData fieldName="Created On" fieldValue={studentDocumentData.createdAt.split("T")[0]} />
                </div>
            </>
        );
    }
    else if (studentDocumentData.documentType === "OTHER") {
        return (
            <>
                <div className="mt-4 mx-6 gap-3 grid grid-cols-2 duration-300 ease-out">
                    {/* Document Type */}
                    <CardData fieldName="Document Type" fieldValue={studentDocumentData.documentType} />
                    {/* Document Name */}
                    <CardData fieldName="Document Name" fieldValue={studentDocumentData.documentName} />
                    {/* Institute */}
                    <CardData fieldName="Institute" fieldValue={studentDocumentData.institute} />
                    {/* Id No */}
                    <CardData fieldName="Id No." fieldValue={studentDocumentData.idNo} />
                    {/* Session */}
                    <CardData fieldName="Session" fieldValue={studentDocumentData.session} />
                    {/* Created On */}
                    <CardData fieldName="Created On" fieldValue={studentDocumentData.createdAt.split("T")[0]} />
                </div>
            </>
        );
    };
};