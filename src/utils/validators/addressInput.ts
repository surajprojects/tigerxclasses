import z from "zod";
import { State } from "@/db/generated/prisma";

export const addressInput = z.object({
    flatHouseBuilding: z.string().optional(),
    streetOrArea: z.string(),
    landmark: z.string().optional(),
    city: z.string(),
    state: z.enum([...Object.values(State)] as [State, ...State[]]),
    pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits number string. Example - '123456'").optional().or(z.literal("")),
}).strict();

export type AddressInput = z.infer<typeof addressInput>;