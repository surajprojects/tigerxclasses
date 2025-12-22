import Btn from "../button/btn";
import { errorHandle } from "@/utils/errors/errorHandle";
import { StudentsList } from "@/utils/types/studentType";
import { filterDataType } from "@/utils/types/filterType";
import axiosProtected from "@/utils/axios/axiosProtected";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Spinner from "../ui/spinner";

export default function StudentsPagination({
    filterData,
    studentsCount,
    takeRows,
    currentPage,
    setAllStudentsData,
    setAllStudentsCount,
    setTakeRows,
    setCurrentPage,
}: {
    filterData: filterDataType,
    studentsCount: number,
    takeRows: string,
    currentPage: number,
    setAllStudentsData: Dispatch<SetStateAction<StudentsList>>,
    setAllStudentsCount: Dispatch<SetStateAction<number>>,
    setTakeRows: Dispatch<SetStateAction<string>>,
    setCurrentPage: Dispatch<SetStateAction<number>>,
}) {
    const isFirstRender = useRef(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const totalPages = Math.ceil(studentsCount / Number(takeRows));
    const [btnDisabled, setIsBtnDisabled] = useState({
        prevBtn: true,
        nextBtn: totalPages > 1 ? false : true,
    });

    const handlePageChange = async () => {
        setIsLoading(true);
        try {
            const result = await axiosProtected.get(`/payments?page=${currentPage}&limit=${takeRows}&name=${filterData.fullName}&rollno=${filterData.rollNo}&gender=${filterData.gender}&category=${filterData.category}&dob=${filterData.dob}&mobileno=${filterData.mobileNo}&fathername=${filterData.fatherName}&mothername=${filterData.motherName}`);
            setAllStudentsData(result.data.allStudents);
            setAllStudentsCount(result.data.studentsCount);
        }
        catch (error: unknown) {
            errorHandle(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        handlePageChange();
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
                <p className="flex">Showing {isLoading && <Spinner className="fill-gray-400 mx-2" customize={true} />}{!isLoading && currentPage} to {totalPages}</p>
                <div className="flex justify-between items-center gap-x-2">
                    <div className="w-14">
                        <Btn
                            text="Prev"
                            btnDisabled={isLoading ? true : btnDisabled.prevBtn}
                            handleClick={() => {
                                if (currentPage > 1) {
                                    setIsBtnDisabled((prevData) => {
                                        return {
                                            ...prevData,
                                            prevBtn: (currentPage - 1) === 1,
                                            nextBtn: false,
                                        };
                                    })
                                    setCurrentPage((prevData) => prevData - 1);
                                }
                            }}
                        />
                    </div>
                    <div className="w-14">
                        <Btn
                            text="Next"
                            btnDisabled={isLoading ? true : btnDisabled.nextBtn}
                            handleClick={() => {
                                if ((totalPages > 1) && (currentPage < totalPages)) {
                                    setIsBtnDisabled((prevData) => {
                                        return {
                                            ...prevData,
                                            prevBtn: false,
                                            nextBtn: (currentPage + 1) === totalPages,
                                        };
                                    })
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