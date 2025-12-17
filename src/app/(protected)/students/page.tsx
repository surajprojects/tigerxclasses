import getStudents from "@/lib/server/getStudents";
import AddStudentBtn from "@/components/button/student/addStudentBtn";
import AllStudentsWrapper from "@/components/students/allStudentsWrapper";
import { FunnelIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default async function Students() {
    const allStudentsData = await getStudents();
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h6 className="text-4xl text-gray-800 font-bold">Students</h6>
                        <p className="my-1 font-medium text-gray-500 text-lg">Manage all your students</p>
                    </div>
                    <AddStudentBtn />
                </div>
                <div className="rounded-2xl bg-white flex items-center p-6 my-6 border border-gray-100 shadow-sm">
                    <div className="rounded-2xl bg-gray-50 p-2 mt-4 flex items-center w-full">
                        <label htmlFor="searchStudent" className="text-gray-400 cursor-pointer">
                            <MagnifyingGlassIcon className="size-5 ml-2 mr-3" />
                        </label>
                        <input
                            type="text"
                            name="searchStudent"
                            id="searchStudent"
                            placeholder="Search by name"
                            className="w-full outline-none text-gray-500 font-medium border-b border-gray-200 pb-0.5"
                        />
                        <button
                            type="button"
                            className="text-gray-400 cursor-pointer hover:bg-gray-200 rounded-xl p-1.5 ease-out duration-300"
                        >
                            <XMarkIcon className="size-5" />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="shadow-sm hover:shadow-md transition duration-300 ease-out cursor-pointer rounded-xl border p-2 border-gray-200 mt-3 ml-3 text-gray-600"
                    >
                        <FunnelIcon className="size-5" />
                    </button>
                </div>
                <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm">
                    <div className="mb-2">
                        <p className="text-lg font-bold text-gray-800">All Students</p>
                        <p className="text-sm font-medium text-gray-500">{allStudentsData ? allStudentsData.studentsCount : "0"} students found</p>
                    </div>
                    {allStudentsData && <AllStudentsWrapper
                        allStudents={allStudentsData.allStudents}
                        studentsCount={allStudentsData.studentsCount}
                    />}
                </div>
            </div>
        </>
    );
};