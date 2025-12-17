import Btn from "../button/btn";
import { errorHandle } from "@/utils/errors/errorHandle";
import { StudentsList } from "@/utils/types/studentType";
import axiosProtected from "@/utils/axios/axiosProtected";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function StudentsPagination({
    studentsCount,
    setAllStudentsData,
}: {
    studentsCount: number,
    setAllStudentsData: Dispatch<SetStateAction<StudentsList>>,
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [takeRows, setTakeRows] = useState<string>("5");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(studentsCount / Number(takeRows));

    const handlePageChange = async (page = 1, limit = 5) => {
        setIsLoading(true);
        try {
            const result = await axiosProtected.get(`/students?page=${page}&limit=${limit}`);
            setAllStudentsData(result.data.allStudents);
        }
        catch (error: unknown) {
            errorHandle(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        handlePageChange(currentPage, Number(takeRows));
    }, [currentPage, takeRows])

    return (
        <>
            <div className="flex items-center justify-between mt-5 pt-0.5 text-sm text-gray-500">
                <div>
                    <label htmlFor="takeRows">Rows per page:</label>
                    <select
                        value={takeRows}
                        onChange={(evt) => setTakeRows(evt.target.value)}
                        id="takeRows"
                        name="takeRows"
                        className="cursor-pointer ml-1.5 rounded-md p-0.5 border border-gray-400/75"
                    >
                        <option key={1} value="5">5</option>
                        <option key={2} value="10">10</option>
                        <option key={3} value="20">20</option>
                        <option key={4} value="50">50</option>
                    </select>
                </div>
                <p>Showing {currentPage} to {totalPages}</p>
                <div className="flex justify-between items-center gap-x-2">
                    <div className="w-14">
                        <Btn
                            text="Prev"
                            isLoading={isLoading}
                            btnDisabled={isLoading}
                            handleClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage((prevData) => prevData - 1);
                                }
                            }}
                        />
                    </div>
                    <div className="w-14">
                        <Btn
                            text="Next"
                            isLoading={isLoading}
                            btnDisabled={isLoading}
                            handleClick={() => {
                                if (currentPage < totalPages) {
                                    setCurrentPage((prevData) => prevData + 1);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};  