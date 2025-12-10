"use client"

import UserForm from "./userForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserData } from "@/utils/types/userType";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { UserFormInputEdit } from "@/utils/validators/userInput";

export default function UserEditForm({ userData, userId = "1" }: { userData: UserData, userId?: string, }) {
    const router = useRouter();
    const handleEditSubmit = async (formData: UserFormInputEdit) => {
        try {
            await axiosProtected.patch(`/users/${userId}`, formData);
            toast.success("User updated successfully!!!");
            router.push(`/users/${userId}/profile`);
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };
    return (
        <>
            <UserForm
                handleEditSubmit={handleEditSubmit}
                showAddress={userData.address ? true : false}
                initialData={{
                    password: "",
                    confirmPassword: "",
                    username: userData.username,
                    remarks: userData.remarks ? userData.remarks : "",
                    photo: userData.photo ? userData.photo : "",
                    fullName: userData.fullName,
                    fatherName: userData.fatherName ? userData.fatherName : "",
                    motherName: userData.motherName ? userData.motherName : "",
                    dob: userData.dob.split("T")[0],
                    gender: userData.gender,
                    category: userData.category,
                    email: userData.email,
                    mobileNo: userData.mobileNo,
                    instituteName: userData.instituteName,
                    instituteAddress: userData.instituteAddress ? userData.instituteAddress : "",
                    contactNo: userData.contactNo ? userData.contactNo : "",
                    address: userData.address ? {
                        flatHouseBuilding: userData.address.flatHouseBuilding ? userData.address.flatHouseBuilding : "",
                        streetOrArea: userData.address.streetOrArea,
                        landmark: userData.address.landmark ? userData.address.landmark : "",
                        city: userData.address.city,
                        state: userData.address.state,
                        pincode: userData.address.pincode ? userData.address.pincode : "",
                    } : {
                        flatHouseBuilding: "",
                        streetOrArea: "",
                        landmark: "",
                        city: "",
                        state: "",
                        pincode: "",
                    },
                }}
            />
        </>
    );
};