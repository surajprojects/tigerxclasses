import { StudentCourseData } from "./studentCourseType";

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