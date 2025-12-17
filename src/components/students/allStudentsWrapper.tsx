"use client"

import { useState } from "react";
import Table from "./studentsTable";
import StudentsPagination from "./studentsPagination";
import { StudentsList } from "@/utils/types/studentType";

export default function AllStudentsWrapper({
    allStudents,
    studentsCount,
}: {
    allStudents: StudentsList,
    studentsCount: number,
}) {
    const [allStudentsData, setAllStudentsData] = useState<StudentsList>(allStudents);
    return (
        <>
            <div>
                <Table allStudents={allStudentsData} />
                <StudentsPagination
                    studentsCount={studentsCount}
                    setAllStudentsData={setAllStudentsData}
                />
            </div>
        </>
    );
};