import prisma from "@/db";
import { NextRequest } from "next/server";
import { verifyAdmin, verifyUser } from "@/lib/verifyUser";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { studentDocumentInput, StudentDocumentInput } from "@/utils/validators/studentDocumentInput";
import { verifyUserSubscription } from "@/lib/verifyUserSubscription";

export async function POST(req: NextRequest, { params }: { params: Promise<{ studentId: string }> }) {
    try {
        const token = await verifyUser(req);

        if (!token) {
            return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
        }

        const { studentId } = await params;

        if (token.role === "ADMIN") {
            const isAdmin = await verifyAdmin(req);

            if (!isAdmin) {
                return Response.json({ message: "Unauthorized!!!" }, { status: 401 });
            }

            const data: StudentDocumentInput = await req.json();
            const parsedInput = studentDocumentInput.safeParse(data);

            if (!parsedInput.success) {
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
                    ...(parsedInput.data.obtainedMarks && { obtainedMarks: Number(parsedInput.data.obtainedMarks) }),
                    ...(parsedInput.data.totalMarks && { totalMarks: Number(parsedInput.data.totalMarks) }),
                    ...(parsedInput.data.session && { session: parsedInput.data.session }),
                    ...(parsedInput.data.documentLink && { documentLink: parsedInput.data.documentLink }),
                }
            });

            return Response.json({ message: "Successfully created the student document!!!", studentDocumentData }, { status: 201 });
        }

        const data: StudentDocumentInput = await req.json();
        const parsedInput = studentDocumentInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const subscriptionCheck = await verifyUserSubscription(token.sub ? token.sub : "");

        if (!subscriptionCheck) {
            return Response.json({ message: "User not found!!!" }, { status: 404 });
        }

        if (subscriptionCheck.userStatus === "SUSPENDED") {
            return Response.json({ message: "Your account has been suspended. Contact support." }, { status: 403 });
        }

        if (subscriptionCheck.userStatus === "INACTIVE") {
            const getStudentDocumentData = await prisma.studentDocument.findMany({
                where: {
                    studentId: studentId,
                    isDeleted: false,
                },
            });

            if (getStudentDocumentData.length > 1) {
                return Response.json({ message: "You&#8217;ve reached your account limit. No more than 2 document can be created." }, { status: 402 });
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
                    ...(parsedInput.data.obtainedMarks && { obtainedMarks: Number(parsedInput.data.obtainedMarks) }),
                    ...(parsedInput.data.totalMarks && { totalMarks: Number(parsedInput.data.totalMarks) }),
                    ...(parsedInput.data.session && { session: parsedInput.data.session }),
                    ...(parsedInput.data.documentLink && { documentLink: parsedInput.data.documentLink }),
                }
            });

            return Response.json({ message: "Successfully created the student document!!!", studentDocumentData }, { status: 201 });
        }

        if (subscriptionCheck.userStatus === "ACTIVE") {
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
                    ...(parsedInput.data.obtainedMarks && { obtainedMarks: Number(parsedInput.data.obtainedMarks) }),
                    ...(parsedInput.data.totalMarks && { totalMarks: Number(parsedInput.data.totalMarks) }),
                    ...(parsedInput.data.session && { session: parsedInput.data.session }),
                    ...(parsedInput.data.documentLink && { documentLink: parsedInput.data.documentLink }),
                }
            });

            return Response.json({ message: "Successfully created the student document!!!", studentDocumentData }, { status: 201 });
        }
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};