import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyUser } from "@/lib/apiAuth";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { studentDocumentInputEdit, StudentDocumentInputEdit } from "@/utils/validators/studentDocumentInput";

export async function GET(req: NextRequest, { params }: { params: { studentDocumentId: string, studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId, studentDocumentId } = params;

        const studentDocumentData = await prisma.studentDocument.findUnique({
            where: {
                id: studentDocumentId,
                studentId: studentId,
                isDeleted: false,
            }
        });

        if (!studentDocumentData) {
            return Response.json({ message: "Student document not found!!!" }, { status: 404 });
        }

        return Response.json({ message: "Successfully found student document!!!", studentDocumentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function PATCH(req: NextRequest, { params }: { params: { studentDocumentId: string, studentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentDocumentId, studentId } = params;
        const data: StudentDocumentInputEdit = await req.json();
        const parsedInput = studentDocumentInputEdit.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const studentDocumentData = await prisma.studentDocument.update({
            where: {
                studentId,
                id: studentDocumentId,
                isDeleted: false,
            },
            data: {
                ...(parsedInput.data.documentType && { documentType: parsedInput.data.documentType }),
                ...(parsedInput.data.documentName && { documentName: parsedInput.data.documentName }),
                ...(parsedInput.data.institute && { institute: parsedInput.data.institute }),
                ...(parsedInput.data.instituteName && { instituteName: parsedInput.data.instituteName }),
                ...(parsedInput.data.idNo && { idNo: parsedInput.data.idNo }),
                ...(parsedInput.data.aadhaarNo && { aadhaarNo: parsedInput.data.aadhaarNo }),
                ...(parsedInput.data.rollNo && { rollNo: parsedInput.data.rollNo }),
                ...(parsedInput.data.enrollmentNo && { enrollmentNo: parsedInput.data.enrollmentNo }),
                ...(parsedInput.data.session && { session: parsedInput.data.session }),
                ...(parsedInput.data.obtainedMarks && { obtainedMarks: parsedInput.data.obtainedMarks }),
                ...(parsedInput.data.totalMarks && { totalMarks: parsedInput.data.totalMarks }),
                ...(parsedInput.data.documentLink && { documentLink: parsedInput.data.documentLink }),
            }
        });

        return Response.json({ message: "Successfully updated the student document!!!", studentDocumentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};

export async function DELETE(req: NextRequest, { params }: { params: { studentId: string, studentDocumentId: string } }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId, studentDocumentId } = params;

        const studentDocumentData = await prisma.studentDocument.update({
            where: {
                id: studentDocumentId,
                studentId,
                isDeleted: false,
            },
            data: {
                isDeleted: true,
            }
        });

        return Response.json({ message: "Successfully deleted the student document!!!", studentDocumentData }, { status: 200 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};