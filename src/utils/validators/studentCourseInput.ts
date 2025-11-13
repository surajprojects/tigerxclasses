import z from "zod";
import { FeesStatus, StudentCourseStatus } from "@/db/generated/prisma";

export const studentCourseInput = z.object({
    batchCode: z.string(),
    courseCode: z.string(),
    enrolledOn: z.string(),
    totalFees: z.number(),
    session: z.string(),
    remarks: z.string().optional(),
}).strict();

export type StudentCourseInput = z.infer<typeof studentCourseInput>;

export const studentCourseInputEdit = studentCourseInput.partial().extend({
    status: z.enum([...Object.values(StudentCourseStatus)] as [StudentCourseStatus, ...StudentCourseStatus[]]).optional(),
    feesStatus: z.enum([...Object.values(FeesStatus)] as [FeesStatus, ...FeesStatus[]]).optional(),
}).strict();

export type StudentCourseInputEdit = z.infer<typeof studentCourseInputEdit>;