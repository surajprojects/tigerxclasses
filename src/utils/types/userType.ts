import { AddressData } from "./addressType";
import { SubscriptionsList } from "./subscriptionType";

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
    address?: AddressData,
    instituteName: string,
    instituteAddress?: string,
    contactNo?: string,
    logo?: string,
    status: string,
    isDeleted: boolean,
    verified: boolean,
    subscriptions: SubscriptionsList,
};

export type UsersList = UserData[];

export type UserFormData = Omit<
    Required<UserData>,
    "id" | "status" | "isDeleted" | "address" | "subscriptions" | "photo" | "logo" | "verified"
> & {
    address: Omit<Required<NonNullable<UserData["address"]>>, "id">;
    password: string,
};

export type UserProfileFormData = Omit<
    Required<UserData>,
    "id" | "status" | "isDeleted" | "address" | "subscriptions" | "photo" | "logo" | "verified" | "username" | "remarks"
> & {
    address: Omit<Required<NonNullable<UserData["address"]>>, "id">;
};