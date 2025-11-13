import z from "zod";
import { PaymentMethod } from "@/db/generated/prisma";

export const paymentFormInput = z.object({
    amount: z.number(),
    method: z.enum([...Object.values(PaymentMethod)] as [PaymentMethod, ...PaymentMethod[]]),
    date: z.string(),
    remarks: z.string().optional(),
}).strict();

export type PaymentFormInput = z.infer<typeof paymentFormInput>;