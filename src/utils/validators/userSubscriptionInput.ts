import z from "zod";
import { SubscriptionPlan } from "@/db/generated/prisma";

export const userSubscriptionInput = z.object({
    name: z.string(),
    amount: z.number().min(1).max(99999999),
    startedOn: z.string(),
    expiresOn: z.string(),
    plan: z.enum([...Object.values(SubscriptionPlan)] as [SubscriptionPlan, ...SubscriptionPlan[]]),
    remarks: z.string().optional(),
}).strict();

export type UserSubscriptionInput = z.infer<typeof userSubscriptionInput>;

export const userSubscriptionInputEdit = userSubscriptionInput.partial().strict();

export type UserSubscriptionInputEdit = z.infer<typeof userSubscriptionInputEdit>;