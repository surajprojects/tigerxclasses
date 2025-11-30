export interface UserData {
    id: string,
    fullName: string,
    instituteName: string,
    email: string,
    mobileNo: string,
    username: string,
    status: string,
    isDeleted: string,
};

export type UsersList = UserData[];

export type UserRegisterData = Pick<UserData, "id" | "fullName" | "instituteName" | "email" | "mobileNo" | "username">;