import z from "zod";

export const courseFormInput = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    instituteName: z.string(),
    duration: z.string(),
    fees: z.number(),
}).strict();

export type CourseFormInput = z.infer<typeof courseFormInput>;

export const courseFormInputEdit = courseFormInput.partial().strict();

export type CourseFormInputEdit = z.infer<typeof courseFormInputEdit>;