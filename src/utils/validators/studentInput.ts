import z from "zod";
import { addressInput } from "./addressInput";
import { Category, Gender, Institute } from "@/db/generated/prisma";

export const studentFormInput = z.object({
    // Personal info
    fullName: z.string(),
    dob: z.string(),
    gender: z.enum([...Object.values(Gender)] as [Gender, ...Gender[]]),
    category: z.enum([...Object.values(Category)] as [Category, ...Category[]]),
    mobileNo: z.string().regex(/^\d{10}$/, "Mobile No. must be 10 digits number string. Example - '1234567890'"),
    email: z.string().optional(),
    address: addressInput,

    // Family info
    fatherName: z.string(),
    motherName: z.string(),
    parentGuardianMobileNo1: z.string().regex(/^\d{10}$/, "Guardian mobile No. must be 10 digits number string. Example - '1234567890'").optional().or(z.literal("")),
    parentGuardianMobileNo2: z.string().regex(/^\d{10}$/, "Guardian mobile No. must be 10 digits number string. Example - '1234567890'").optional().or(z.literal("")),

    // Education info
    class: z.string().optional(),
    institute: z.enum([...Object.values(Institute)] as [Institute, ...Institute[]]),
    instituteName: z.string().optional(),
    session: z.string().optional(),
    remarks: z.string().optional(),
}).strict();

export type StudentFormInput = z.infer<typeof studentFormInput>;

export const studentFormInputEdit = studentFormInput.partial().strict();

export type StudentFormInputEdit = z.infer<typeof studentFormInputEdit>;