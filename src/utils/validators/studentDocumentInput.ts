import z from "zod";
import { DocumentType, Institute } from "@/db/generated/prisma";

export const studentDocumentInput = z.object({
    documentType: z.enum([...Object.values(DocumentType)] as [DocumentType, ...DocumentType[]]),
    documentName: z.string().optional(),
    institute: z.enum([...Object.values(Institute)] as [Institute, ...Institute[]]),
    instituteName: z.string().optional(),
    idNo: z.string().optional(),
    aadhaarNo: z.string().optional(),
    rollNo: z.string().optional(),
    enrollmentNo: z.string().optional(),
    obtainedMarks: z.number().optional(),
    totalMarks: z.number().optional(),
    session: z.string().optional(),
    documentLink: z.string().optional(),
}).strict();

export type StudentDocumentInput = z.infer<typeof studentDocumentInput>;

export const studentDocumentInputEdit = studentDocumentInput.partial().strict();

export type StudentDocumentInputEdit = z.infer<typeof studentDocumentInputEdit>;