import z from "zod";
import { DocumentType, Institute } from "@/db/generated/prisma";

export const studentDocumentInput = z.object({
    documentType: z.enum([...Object.values(DocumentType)] as [DocumentType, ...DocumentType[]]),
    documentName: z.string().optional(),
    institute: z.enum([...Object.values(Institute)] as [Institute, ...Institute[]]),
    instituteName: z.string().optional(),
    idNo: z.string().optional(),
    aadhaarNo: z.string().regex(/^\d{12}$/, "Aadhaar No. must be 12 digits number string. Example - '1234 5678 9012'").optional().or(z.literal("")),
    rollNo: z.string().regex(/^\d{1,12}$/, "Roll No. must be between 1 to 12 digits number string. Example - '123456789012'").optional().or(z.literal("")),
    enrollmentNo: z.string().optional(),
    obtainedMarks: z.string().regex(/^\d{1,8}$/, "Obtained Marks must be between 1 to 8 digits number string. Example - '12345678'").optional().or(z.literal("")),
    totalMarks: z.string().regex(/^\d{1,8}$/, "Total Marks must be between 1 to 8 digits number string. Example - '12345678'").optional().or(z.literal("")),
    session: z.string().optional(),
    documentLink: z.string().optional(),
}).strict();

export type StudentDocumentInput = z.infer<typeof studentDocumentInput>;

export const studentDocumentInputEdit = studentDocumentInput.partial().strict();

export type StudentDocumentInputEdit = z.infer<typeof studentDocumentInputEdit>;