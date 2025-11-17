export interface StudentDocumentData {
    id: string,
    studentId: string,
    documentType: string,
    documentName?: string,
    institute: string,
    instituteName?: string,
    idNo?: string,
    aadhaarNo?: string,
    rollNo?: string,
    enrollmentNo?: string,
    passingSession?: string,
    obtainedMarks?: number,
    totalMarks?: number,
    session?: string,
    documentLink?: string,
};

export type StudentDocumentList = StudentDocumentData[];