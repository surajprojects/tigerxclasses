export interface BatchData {
    id: string,
    code: string,
    name: string,
    description: string,
    time: string,
    startDate: string,
    endDate: string,
    _count: {
        students: number
    },
};

export type BatchesList = BatchData[];