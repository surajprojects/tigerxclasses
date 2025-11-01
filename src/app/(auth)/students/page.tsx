import { PlusIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Students() {
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h6 className="text-4xl text-gray-800 font-bold">Students</h6>
                        <p className="my-1 font-medium text-gray-500 text-lg">Manage all your students</p>
                    </div>
                    <button
                        type="button"
                        className="text-white bg-blue-500 rounded-xl px-4 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-400 h-fit w-fit flex items-center justify-center"
                    >
                        <PlusIcon className="size-5 mr-2" />
                        Add Course
                    </button>
                </div>
                <div className="rounded-2xl bg-white p-8 my-8 border border-gray-100 shadow-sm">
                    <div className="rounded-2xl bg-gray-50 p-4 mt-6 flex items-center">
                        <label htmlFor="searchStudent" className="text-gray-400 cursor-pointer">
                            <MagnifyingGlassIcon className="size-5 ml-2 mr-3" />
                        </label>
                        <input
                            type="text"
                            name="searchStudent"
                            id="searchStudent"
                            placeholder="Search by name"
                            className="w-full outline-none text-gray-500 font-medium"
                        />
                        <button
                            type="button"
                            className="text-gray-400 cursor-pointer hover:bg-gray-200 rounded-xl p-1.5 ease-out duration-300"
                        >
                            <XMarkIcon className="size-5" />
                        </button>
                    </div>
                </div>
                <div className="rounded-2xl bg-white p-8 border border-gray-100 shadow-sm">
                    <div>
                        <p className="text-lg font-bold text-gray-800">All Students</p>
                        <p className="text-sm font-medium text-gray-500">4 students found</p>
                    </div>
                </div>
            </div>
        </>
    );
};