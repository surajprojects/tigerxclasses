import { AddressData } from "./addressType";
import { StudentCourseData, StudentCourseList } from "./studentCourseType";
import { StudentDocumentList } from "./studentDocumentType";

export interface StudentData {
    id: string,
    rollNo: number,

    fullName: string,
    dob: string,
    gender: string,
    category: string,
    mobileNo: string,
    email?: string,
    address: AddressData,

    fatherName: string,
    motherName: string,
    parentGuardianMobileNo1?: string,
    parentGuardianMobileNo2?: string,

    class?: string,
    institute: string,
    instituteName?: string,
    session?: string,
    remarks?: string,

    userId: string,
    photo?: string,

    documents: StudentDocumentList,
    studentCourses: StudentCourseList,
};

export type StudentsList = StudentData[];

export type StudentFormData = Omit<
    Required<StudentData>,
    "id" | "userId" | "photo" | "documents" | "studentCourses" | "address"
> & {
    address: Omit<Required<StudentData["address"]>, "id">;
};

export interface StudentFeesData {
    id: string,
    fullName: string,
    fatherName: string,
    totalFees: number,
    paidFees: number,
    status: {
        status: string,
        feesStatus: string,
    }[],
};

export type StudentsFeesList = StudentFeesData[];