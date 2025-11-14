import prisma from "@/db";
import bcrypt from "bcryptjs";
import { userFormInput, UserFormInput } from "@/utils/validators/userInput";

export async function GET(req: Request) {
    try {
        // const data: UserFormInput = await req.json();
        // const parsedInput = userFormInput.safeParse(data);

        // if (!parsedInput.success) {
        //     return Response.json({ message: "Invalid input!!!", details: parsedInput.error.errors }, { status: 400 });
        // }

        const hashedPassword = bcrypt.hashSync("tiger12345", 10);

        const addressData = await prisma.address.create({
            data: {
                city: "sheopur",
                state: "MADHYA_PRADESH",
                streetOrArea: "sheopur",
            }
        });

        const userData = await prisma.user.create({
            data: {
                category: "ST",
                dob: "2025-01-01T00:00:00.000Z",
                email: "tiger@gmail.com",
                gender: "MALE",
                instituteName: "tiger classes",
                mobileNo: "1234567890",
                name: "tiger",
                password: hashedPassword,
                username: "tiger",
                addressId: addressData.id,
            }
        });

        return Response.json({ message: "Successfully created the user!!!", userData }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};