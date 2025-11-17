"use client"

import { toast } from "react-toastify";
import StudentForm from "./studentForm";
import { useRouter } from "next/navigation";
import { StudentData } from "@/utils/types/studentType";
import { errorHandle } from "@/utils/errors/errorHandle";
import axiosProtected from "@/utils/axios/axiosProtected";
import { StudentFormInputEdit } from "@/utils/validators/studentInput";

export default function StudentEditForm({ studentData, studentId = "1" }: { studentData: StudentData, studentId?: string, }) {
    const router = useRouter();
    const handleEditSubmit = async (formData: StudentFormInputEdit) => {
        try {
            await axiosProtected.patch(`/students/${studentId}`, formData);
            toast.success("Student updated successfully!!!");
            router.push(`/students/${studentId}/profile`);
        }
        catch (error: unknown) {
            errorHandle(error);
        }
    };
    return (
        <>
            <StudentForm
                handleEditSubmit={handleEditSubmit}
                initialData={{
                    fullName: studentData.fullName,
                    dob: studentData.dob.split("T")[0],
                    gender: studentData.gender,
                    category: studentData.category,
                    mobileNo: studentData.mobileNo,
                    email: studentData.email ? studentData.email : "",
                    fatherName: studentData.fatherName,
                    motherName: studentData.motherName,
                    parentGuardianMobileNo1: studentData.parentGuardianMobileNo1 ? studentData.parentGuardianMobileNo1 : "",
                    parentGuardianMobileNo2: studentData.parentGuardianMobileNo2 ? studentData.parentGuardianMobileNo2 : "",
                    class: studentData.class ? studentData.class : "",
                    institute: studentData.institute,
                    instituteName: studentData.instituteName ? studentData.instituteName : "",
                    session: studentData.session ? studentData.session : "",
                    remarks: studentData.remarks ? studentData.remarks : "",
                    address: {
                        flatHouseBuilding: studentData.address.flatHouseBuilding ? studentData.address.flatHouseBuilding : "",
                        streetOrArea: studentData.address.streetOrArea,
                        landmark: studentData.address.landmark ? studentData.address.landmark : "",
                        city: studentData.address.city,
                        state: studentData.address.state,
                        pincode: studentData.address.pincode ? studentData.address.pincode : "",
                    }
                }}
            />
        </>
    );
};