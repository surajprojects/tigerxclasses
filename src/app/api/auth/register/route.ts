import prisma from "@/db";
import bcrypt from "bcryptjs";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { userFormInput, UserFormInput } from "@/utils/validators/userInput";

export async function POST(req: Request) {
    try {
        const data: UserFormInput = await req.json();
        const parsedInput = userFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(parsedInput.data.password, 10);

        const userData = await prisma.user.create({
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
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
                ...(parsedInput.data.contactNo && { contactNo: parsedInput.data.contactNo }),
                ...(parsedInput.data.instituteAddress && { instituteAddress: parsedInput.data.instituteAddress }),
                ...(parsedInput.data.address && {
                    address: {
                        create: {
                            ...(parsedInput.data.address.flatHouseBuilding && { flatHouseBuilding: parsedInput.data.address.flatHouseBuilding }),
                            streetOrArea: parsedInput.data.address.streetOrArea,
                            ...(parsedInput.data.address.landmark && { landmark: parsedInput.data.address.landmark }),
                            city: parsedInput.data.address.city,
                            state: parsedInput.data.address.state,
                            ...(parsedInput.data.address.pincode && { pincode: parsedInput.data.address.pincode }),
                        },
                    },
                }),
            },
            select: {
                id: true,
                fullName: true,
                instituteName: true,
                email: true,
                mobileNo: true,
                username: true,
            }
        });

        return Response.json({ message: "Successfully created the user!!!", userData }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};