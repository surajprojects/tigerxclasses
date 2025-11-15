import { StudentData } from "./studentType";

export interface CourseData {
    id: string,
    name: string,
    description: string,
    instituteName: string,
    code: string,
    duration: string,
    fees: number,
    _count: {
        students: number
    },
};

export type CoursesList = CourseData[];