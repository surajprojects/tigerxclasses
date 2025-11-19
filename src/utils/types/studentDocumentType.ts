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
    obtainedMarks?: number,
    totalMarks?: number,
    session?: string,
    documentLink?: string,
    createdAt: string,
};

export type StudentDocumentList = StudentDocumentData[];