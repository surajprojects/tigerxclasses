import z from "zod";

export const courseFormInput = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    instituteName: z.string(),
    duration: z.string(),
    fees: z.string().regex(/^\d{1,10}$/, "Total fees must be between 1 to 10 digits number string"),
}).strict();

export type CourseFormInput = z.infer<typeof courseFormInput>;

export const courseFormInputEdit = courseFormInput.partial().strict();

export type CourseFormInputEdit = z.infer<typeof courseFormInputEdit>;