import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { studentDocumentInput, StudentDocumentInput } from "@/utils/validators/studentDocumentInput";

export async function POST(req: NextRequest, { params }: { params: Promise<{ studentId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = await params;
        const data: StudentDocumentInput = await req.json();
        const parsedInput = studentDocumentInput.safeParse(data);

        if (!parsedInput.success) {
            console.log(parsedInput.error.issues)
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const studentDocumentData = await prisma.studentDocument.create({
            data: {
                studentId,
                documentType: parsedInput.data.documentType,
                ...(parsedInput.data.documentName && { documentName: parsedInput.data.documentName }),
                institute: parsedInput.data.institute,
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.idNo && { idNo: parsedInput.data.idNo }),
                ...(parsedInput.data.aadhaarNo && { aadhaarNo: parsedInput.data.aadhaarNo }),
                ...(parsedInput.data.rollNo && { rollNo: parsedInput.data.rollNo }),
                ...(parsedInput.data.enrollmentNo && { enrollmentNo: parsedInput.data.enrollmentNo }),
                ...(parsedInput.data.obtainedMarks && { obtainedMarks: parsedInput.data.obtainedMarks }),
                ...(parsedInput.data.totalMarks && { totalMarks: parsedInput.data.totalMarks }),
                ...(parsedInput.data.session && { session: parsedInput.data.session }),
                ...(parsedInput.data.documentLink && { documentLink: parsedInput.data.documentLink }),
            }
        });

        return Response.json({ message: "Successfully created the student document!!!", studentDocumentData }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};