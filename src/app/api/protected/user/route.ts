import prisma from "@/db";
import apiErrorHandle from "@/utils/errors/apiErrorHandle";
import { userFormInput, UserFormInput } from "@/utils/validators/userInput";

export async function POST(req: Request) {
    try {
        const data: UserFormInput = await req.json();
        const parsedInput = userFormInput.safeParse(data);

        if (!parsedInput.success) {
            return Response.json({ message: "Invalid input!!!", details: parsedInput.error.issues }, { status: 400 });
        }

        const addressData = await prisma.address.create({
            data: {
                ...(parsedInput.data.address.flatHouseBuilding && { flatHouseBuilding: parsedInput.data.address.flatHouseBuilding }),
                streetOrArea: parsedInput.data.address.streetOrArea,
                ...(parsedInput.data.address.landmark && { landmark: parsedInput.data.address.landmark }),
                city: parsedInput.data.address.city,
                state: parsedInput.data.address.state,
                ...(parsedInput.data.address.pincode && { pincode: parsedInput.data.address.pincode }),
            }
        });

        const userData = await prisma.user.create({
            data: {
                username: parsedInput.data.username,
                password: parsedInput.data.password,
                email: parsedInput.data.email,
                mobileNo: parsedInput.data.mobileNo,
                name: parsedInput.data.name,
                ...(parsedInput.data.fatherName && { fatherName: parsedInput.data.fatherName }),
                ...(parsedInput.data.motherName && { motherName: parsedInput.data.motherName }),
                dob: new Date(parsedInput.data.dob).toISOString(),
                gender: parsedInput.data.gender,
                category: parsedInput.data.category,
                addressId: addressData.id,
                ...(parsedInput.data.photo && { photo: parsedInput.data.photo }),
                ...(parsedInput.data.remarks && { remarks: parsedInput.data.remarks }),
                instituteName: parsedInput.data.instituteName,
                ...(parsedInput.data.instituteAddress && { instituteAddress: parsedInput.data.instituteAddress }),
                ...(parsedInput.data.contactNo && { contactNo: parsedInput.data.contactNo }),
            }
        });

        return Response.json({ message: "User created the successfully!!!", userData }, { status: 201 });
    }
    catch (error: unknown) {
        return apiErrorHandle(error);
    }
};