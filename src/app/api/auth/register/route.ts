import prisma from "@/db";
import bcrypt from "bcryptjs";
import { userFormInput, UserFormInput } from "@/utils/validators/userInput";

export async function POST(req: Request) {
    try {
        const data: UserFormInput = await req.json();
        const parsedInput = userFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(parsedInput.data.password, 10);

        await prisma.user.create({
            data: {
                fullName: parsedInput.data.fullName,
                dob: new Date(parsedInput.data.dob),
                gender: parsedInput.data.gender,
                category: parsedInput.data.category,
                email: parsedInput.data.email,
                mobileNo: parsedInput.data.mobileNo,
                instituteName: parsedInput.data.instituteName,
                username: parsedInput.data.username,
                password: hashedPassword,
            },
        });

        return Response.json({ message: "Successfully created the user!!!" }, { status: 201 });
    }
    catch (error) {
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
};