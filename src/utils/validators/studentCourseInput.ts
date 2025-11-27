import z from "zod";
import { FeesStatus, StudentCourseStatus } from "@/db/generated/prisma";

export const studentCourseInput = z.object({
    batchId: z.string(),
    courseId: z.string(),
    enrolledOn: z.string(),
    totalFees: z.string().regex(/^\d{1,10}$/, "Total fees must be between 1 to 10 digits"),
    session: z.string(),
    remarks: z.string().optional(),
    status: z.enum([...Object.values(StudentCourseStatus)] as [StudentCourseStatus, ...StudentCourseStatus[]]).optional(),
}).strict();

export type StudentCourseInput = z.infer<typeof studentCourseInput>;

export const studentCourseInputEdit = studentCourseInput.partial().strict();

export type StudentCourseInputEdit = z.infer<typeof studentCourseInputEdit>;