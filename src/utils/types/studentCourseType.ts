import { BatchData } from "./batchType";
import { CourseData } from "./courseType";
import { StudentData } from "./studentType";
import { PaymentsList } from "./paymentType";

export interface StudentCourseData {
    id: string,
    enrolledOn: string,
    totalFees: number,
    session: string,
    remarks?: string,

    status: string,
    feesStatus: string,
    payments: PaymentsList,

    batchId: string,
    courseId: string,
    studentId: string,

    batch: BatchData,
    course: CourseData,
    students: StudentData[],
};

export type StudentCourseList = StudentCourseData[];