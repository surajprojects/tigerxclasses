import Btn from "../button/btn";
import Spinner from "../ui/spinner";
import FormField from "../form/formField";
import { FunnelIcon } from "lucide-react";
import { Category, Gender } from "@/db/generated/prisma";
import { errorHandle } from "@/utils/errors/errorHandle";
import { StudentsList } from "@/utils/types/studentType";
import axiosProtected from "@/utils/axios/axiosProtected";
import { filterDataType } from "@/utils/types/filterType";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { MagnifyingGlassIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function StudentsSearchFilter({
    takeRows,
    currentPage,
    filterData,
    setCurrentPage,
    setFilterData,
    setAllStudentsData,
    setAllStudentsCount,
}: {
    takeRows: string,
    currentPage: number,
    filterData: filterDataType,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    setFilterData: Dispatch<SetStateAction<filterDataType>>,
    setAllStudentsData: Dispatch<SetStateAction<StudentsList>>,
    setAllStudentsCount: Dispatch<SetStateAction<number>>,
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
    const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);

    const handleChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = evt.target.name;
        const changedValue = evt.target.value;

        if ((fieldName === "fullName")) {
            if (changedValue.length > 0) {
                setShowClearBtn(true);
            }
            else {
                setShowClearBtn(false);
            }
        }

        setFilterData((prevData) => {
            return {
                ...prevData,
                [fieldName]: changedValue,
            };
        });
    };

    const hideClearBtn = () => {
        setShowClearBtn(false);
        setFilterData((prevData) => {
            return { ...prevData, fullName: "" };
        });
    };

    const handleSubmit = async () => {
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

    const handleClearFilters = () => {
        setFilterData((prevData) => {
            return {
                ...prevData,
                rollNo: "",
                dob: "",
                gender: "",
                category: "",
                fatherName: "",
                motherName: "",
                mobileNo: "",
            };
        });
        handleSubmit();
    };

    return (
        <>
            <div className="rounded-2xl bg-white flex flex-col p-6 my-6 border border-gray-100 shadow-sm">
                <div className="w-full flex items-center">
                    <div className="rounded-2xl bg-gray-50 p-2 mt-4 flex items-center w-full">
                        <label htmlFor="fullName" className="text-gray-400 cursor-pointer">
                            <MagnifyingGlassIcon className="size-5 ml-2 mr-3" />
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={filterData.fullName}
                            onChange={handleChange}
                            placeholder="Search by name"
                            className="w-full outline-none text-gray-500 font-medium border-b border-gray-200 pb-0.5"
                        />
                        {isLoading && <Spinner customize={true} className="fill-gray-400" />}
                        {showClearBtn && <button
                            type="button"
                            onClick={hideClearBtn}
                            className="text-gray-400 cursor-pointer hover:bg-gray-200 rounded-xl p-1.5 ease-out duration-300"
                        >
                            <XMarkIcon className="size-5" />
                        </button>}
                        <button
                            type="button"
                            onClick={() => {
                                if (filterData.fullName.length > 0) {
                                    handleSubmit();
                                }
                            }}
                            disabled={isLoading}
                            className="text-gray-400 cursor-pointer hover:bg-gray-200 rounded-xl p-1.5 ease-out duration-300 disabled:cursor-not-allowed"
                        >
                            <PaperAirplaneIcon className="size-5" />
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowFilterOptions((prevData) => !prevData)}
                        className="shadow-sm hover:shadow-md transition duration-300 ease-out cursor-pointer rounded-xl border p-2 border-gray-200 mt-3 ml-3 text-blue-500 bg-blue-50"
                    >
                        <FunnelIcon className="size-4" />
                    </button>
                </div>
                {showFilterOptions && <div className="border-t border-gray-200 mt-4 pt-4 flex flex-col">
                    <div className="self-end flex gap-x-2 items-center w-xs">
                        <Btn
                            text="Apply Filters"
                            btnDisabled={isLoading}
                            handleClick={() => {
                                handleSubmit();
                                setCurrentPage(1);
                            }}
                        />
                        <Btn
                            text="Clear Filters"
                            btnDisabled={isLoading}
                            handleClick={handleClearFilters}
                            className="bg-amber-500 hover:bg-amber-500/90 disabled:bg-amber-500/90 text-white"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-x-6 mt-2">
                        {/* Roll No */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="rollNo" className="font-sans font-medium text-sm text-gray-800">Roll No.</label>
                            <input
                                type="text"
                                name="rollNo"
                                id="rollNo"
                                placeholder="123"
                                inputMode="numeric"
                                maxLength={10}
                                value={filterData.rollNo}
                                onChange={(e) => {
                                    const rollNoValue = e.target.value.replace(/\D/g, "");
                                    setFilterData((prevData) => {
                                        return {
                                            ...prevData,
                                            rollNo: rollNoValue,
                                        };
                                    });
                                }}
                                className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-none border-white shadow-sm"
                            />
                        </div>
                        {/* Father Name */}
                        <FormField
                            id="fatherName"
                            title="Father Name"
                            textHolder="Enter father name"
                            fieldValue={filterData.fatherName}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                            isRequired={false}
                        />
                        {/* Mother Name */}
                        <FormField
                            id="motherName"
                            title="Mother Name"
                            textHolder="Enter mother name"
                            fieldValue={filterData.motherName}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                            isRequired={false}
                        />
                        {/* Date of Birth */}
                        <FormField
                            id="dob"
                            title="Date of Birth"
                            fieldType="date"
                            fieldValue={filterData.dob}
                            onChangeFunc={handleChange}
                            removeBorder={true}
                            isRequired={false}
                        />
                        {/* Gender */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="gender" className="font-sans font-medium text-sm text-gray-800">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={filterData.gender}
                                onChange={handleChange}
                                className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                                <option value="" disabled>Select Gender</option>
                                {[...Object.values(Gender)].map((opt, idx) => {
                                    return <option key={idx} value={opt}>{opt}</option>
                                })}
                            </select>
                        </div>
                        {/* Category */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="category" className="font-sans font-medium text-sm text-gray-800">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={filterData.category}
                                onChange={handleChange}
                                className="border-none shadow-sm font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out cursor-pointer">
                                <option value="" disabled>Select Category</option>
                                {[...Object.values(Category)].map((opt, idx) => {
                                    return <option key={idx} value={opt}>{opt}</option>
                                })}
                            </select>
                        </div>
                        {/* Mobile No */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="mobileNo" className="font-sans font-medium text-sm text-gray-800">Mobile No.</label>
                            <input
                                type="text"
                                name="mobileNo"
                                id="mobileNo"
                                placeholder="1234567890"
                                inputMode="numeric"
                                maxLength={10}
                                value={filterData.mobileNo}
                                onChange={(e) => {
                                    const mobileNoValue = e.target.value.replace(/\D/g, "");
                                    setFilterData((prevData) => {
                                        return {
                                            ...prevData,
                                            mobileNo: mobileNoValue,
                                        };
                                    });
                                }}
                                className="border font-sans font-normal text-[#2a2522] rounded-xl px-3 py-2 my-2 text-sm outline-none focus:border-blue-500 focus:ring-3 ring-blue-400/65 duration-75 ease-out border-none border-white shadow-sm"
                            />
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
};