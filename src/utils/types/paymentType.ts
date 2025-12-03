import { StudentCourseData } from "./studentCourseType";
import { SubscriptionData } from "./subscriptionType";

export interface PaymentData {
    id: string,
    amount: number,
    method: string,
    date: string,
    remarks?: string,
    studentCourseId: string,
    studentCourse: StudentCourseData,
};

export type PaymentsList = PaymentData[];

export interface UserPaymentData {
    id: string,
    amount: number,
    method: string,
    date: string,
    remarks?: string,
    subscriptionId: string,
    subscription: SubscriptionData,
};

export type UserPaymentsList = UserPaymentData[];