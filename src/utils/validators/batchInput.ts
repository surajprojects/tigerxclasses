import z from "zod";

export const batchFormInput = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string().optional(),
    time: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
}).strict();

export type BatchFormInput = z.infer<typeof batchFormInput>;

export const batchFormInputEdit = batchFormInput.partial().strict();

export type BatchFormInputEdit = z.infer<typeof batchFormInputEdit>;