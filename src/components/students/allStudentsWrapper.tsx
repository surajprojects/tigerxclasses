"use client"

import { useState } from "react";
import Table from "./studentsTable";
import StudentsPagination from "./studentsPagination";
import { StudentsList } from "@/utils/types/studentType";
import StudentsSearchFilter from "./studentsSearchFilter";
import { filterDataType } from "@/utils/types/filterType";

export default function AllStudentsWrapper({
    allStudents,
    studentsCount,
}: {
    allStudents: StudentsList,
    studentsCount: number,
}) {
    const [allStudentsCount, setAllStudentsCount] = useState<number>(studentsCount);
    const [allStudentsData, setAllStudentsData] = useState<StudentsList>(allStudents);
    const [takeRows, setTakeRows] = useState<string>("5");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [filterData, setFilterData] = useState<filterDataType>({
        rollNo: "",
        fullName: "",
        dob: "",
        gender: "",
        category: "",
        fatherName: "",
        motherName: "",
        mobileNo: "",
    });
    return (
        <>
            <StudentsSearchFilter
                url="/students"
                takeRows={takeRows}
                currentPage={currentPage}
                filterData={filterData}
                setCurrentPage={setCurrentPage}
                setFilterData={setFilterData}
                setAllStudentsData={setAllStudentsData}
                setAllStudentsCount={setAllStudentsCount}
            />
            <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
                <div className="mb-2">
                    <p className="text-lg font-bold text-gray-800">All Students</p>
                    <p className="text-sm font-medium text-gray-500">{allStudentsCount} students found</p>
                </div>
                <Table allStudents={allStudentsData} />
                <StudentsPagination
                    url="/students"
                    filterData={filterData}
                    studentsCount={allStudentsCount}
                    takeRows={takeRows}
                    currentPage={currentPage}
                    setAllStudentsData={setAllStudentsData}
                    setAllStudentsCount={setAllStudentsCount}
                    setTakeRows={setTakeRows}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
};