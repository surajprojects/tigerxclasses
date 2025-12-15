import z from "zod";
import { addressInput } from "./addressInput";
import { Category, Gender, UserStatus } from "@/db/generated/prisma";

export const userFormInput = z.object({
    username: z.string(),
    password: z.string().min(8).max(32),
    fullName: z.string(),
    dob: z.string(),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    status: z.enum([...Object.values(UserStatus)] as [UserStatus, ...UserStatus[]]).optional(),
    gender: z.enum([...Object.values(Gender)] as [Gender, ...Gender[]]),
    category: z.enum([...Object.values(Category)] as [Category, ...Category[]]),
    email: z.string(),
    mobileNo: z.string().regex(/^\d{10}$/, "Mobile No. must be 10 digits number string. Example - '1234567890'"),
    remarks: z.string().optional(),
    address: addressInput.optional(),
    instituteName: z.string(),
    instituteAddress: z.string().optional(),
    contactNo: z.string().regex(/^\d{10}$/, "Contact No. must be 10 digits number string. Example - '1234567890'").optional().or(z.literal("")),
}).strict();

export type UserFormInput = z.infer<typeof userFormInput>;

export const userFormInputEdit = userFormInput.partial().strict();

export type UserFormInputEdit = z.infer<typeof userFormInputEdit>;

export const userProfileFormEdit = userFormInput.omit({
    remarks: true,
    username: true,
    password: true,
    status: true,
}).partial();

export type UserProfileFormEdit = z.infer<typeof userProfileFormEdit>;