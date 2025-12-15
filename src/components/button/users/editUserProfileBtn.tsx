"use client"

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserData } from "@/utils/types/userType";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import UserProfileForm from "@/components/users/userProfileForm";
import { UserProfileFormEdit } from "@/utils/validators/userInput";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function EditUserProfileBtn({ userProfileData }: { userProfileData: UserData }) {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleEditSubmit = async (formData: UserProfileFormEdit) => {
        try {
            await axiosProtected.post("/users", formData);
            toast.success("Profile updated successfully!!!");
            setShowForm(false);
            router.refresh();
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };
    return (
        <>
            <button
                type="button"
                onClick={() => setShowForm(true)}
                className="text-white bg-blue-500 rounded-xl px-3 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-500/90 h-fit w-fit flex items-center justify-center text-sm"
            >
                <PencilIcon className="size-4 mr-2" />
                Edit Profile
            </button>
            {showForm &&
                <div onClick={handleCloseForm} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div onClick={(evt) => evt.stopPropagation()} className="bg-[#f8fafc] p-6 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-none">
                        <button
                            type="button"
                            onClick={handleCloseForm}
                            className="absolute top-2 right-2 m-0.5 hover:bg-gray-100 duration-300 ease-out cursor-pointer rounded-xl p-0.5"
                        >
                            <XMarkIcon className="size-4" />
                        </button>
                        <div className="w-4xl">
                            <h5 className="text-xl font-medium text-gray-800">Edit Profile</h5>
                            <p className="text-gray-600 text-base my-1">Fill in the details to update user profile.
                            </p>
                            <UserProfileForm
                                setShowForm={setShowForm}
                                handleEditSubmit={handleEditSubmit}
                                initialData={{
                                    fullName: userProfileData.fullName,
                                    fatherName: userProfileData.fatherName ? userProfileData.fatherName : "",
                                    motherName: userProfileData.motherName ? userProfileData.motherName : "",
                                    dob: userProfileData.dob.split("T")[0],
                                    gender: userProfileData.gender,
                                    category: userProfileData.category,
                                    mobileNo: userProfileData.mobileNo,
                                    email: userProfileData.email,
                                    instituteName: userProfileData.instituteName,
                                    instituteAddress: userProfileData.instituteAddress ? userProfileData.instituteAddress : "",
                                    contactNo: userProfileData.contactNo ? userProfileData.contactNo : "",
                                    address: userProfileData.address ? {
                                        flatHouseBuilding: userProfileData.address.flatHouseBuilding ? userProfileData.address.flatHouseBuilding : "",
                                        streetOrArea: userProfileData.address.streetOrArea,
                                        landmark: userProfileData.address.landmark ? userProfileData.address.landmark : "",
                                        city: userProfileData.address.city,
                                        state: userProfileData.address.state,
                                        pincode: userProfileData.address.pincode ? userProfileData.address.pincode : "",
                                    } : {
                                        flatHouseBuilding: "",
                                        streetOrArea: "",
                                        landmark: "",
                                        city: "",
                                        state: "",
                                        pincode: "",
                                    },
                                }} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
};