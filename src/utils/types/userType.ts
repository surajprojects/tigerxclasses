import { AddressData } from "./addressType";

export interface UserData {
    id: string,
    username: string,
    fullName: string,
    dob: string,
    fatherName?: string,
    motherName?: string,
    gender: string,
    category: string,
    email: string,
    mobileNo: string,
    photo?: string,
    remarks?: string,
    address: AddressData,
    instituteName: string,
    instituteAddress?: string,
    contactNo?: string,
    status: string,
    isDeleted: string,
};

export type UsersList = UserData[];

export type UserFormData = Omit<
    Required<UserData>,
    "id" | "status" | "isDeleted" | "address"
> & {
    address: Omit<Required<UserData["address"]>, "id">;
    password: string,
};