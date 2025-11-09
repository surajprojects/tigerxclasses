import { PlusIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function StudentProfile() {
    const data = [
        { title: "Full Name", value: "Alice Johnson" },
        { title: "Father Name", value: "Alice Johnson" },
        { title: "Mother Name", value: "Alice Johnson" },
        { title: "Date of Birth", value: "23-Aug-2025" },
        { title: "Gender", value: "Male" },
        { title: "Category", value: "ST" },
        { title: "Class", value: "12th" },
        { title: "Institute", value: "School" },
        { title: "Institute Name", value: "Excellence School" },
        { title: "Mobile No", value: "1234567890" },
        { title: "Guardian Mobile No", value: "1234567890" },
        { title: "Email", value: "alice@gmail.com" },
        { title: "Address", value: "Pali road salapura sheopur (M.P.)" },
        { title: "Remarks", value: "N/A" },
    ];
    return (
        <>
            <div>

                <div className="flex items-center">
                    <button
                        type="button"
                        className="font-medium flex items-center hover:bg-gray-200 px-3 py-1 rounded-lg duration-300 ease-out cursor-pointer"
                    >
                        <ArrowLeftIcon className="size-3.5 mr-1" />
                        Back
                    </button>
                    <p className="flex-1 text-3xl font-bold text-gray-800 mx-4">Alice Johnson</p>
                    <button
                        type="button"
                        className="text-white bg-blue-500 rounded-xl px-4 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-400 h-fit w-fit flex items-center justify-center"
                    >
                        <PlusIcon className="size-5 mr-2" />
                        Edit Student
                    </button>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Personal Information</h5>
                    <p className="text-gray-500 mt-1">Basic details and contact information</p>
                    <ul className="my-6 gap-3 grid grid-cols-2">
                        {data.map((item, idx) => {
                            return <li key={idx}>
                                <ul>
                                    <li className="text-gray-500">{item.title}</li>
                                    <li className="text-gray-800 font-semibold text-lg">{item.value}</li>
                                </ul>
                            </li>
                        })}
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Enrolled Courses</h5>
                    <p className="text-gray-500 mt-1">All courses information</p>
                    <div className="mt-6">
                        <div className="w-sm p-6 rounded-2xl shadow-sm hover:shadow-md bg-white font-medium">
                            <div>
                                <p className="text-xl text-gray-800">DCA</p>
                                <p className="text-base text-gray-500">Diploma in Computer Applications</p>
                            </div>
                            <div className="my-6 flex">
                                <div>
                                    <p className="text-base text-gray-500">Batch</p>
                                    <p className="text-lg text-gray-800">B01T10AM</p>
                                </div>
                                <div className="mx-auto">
                                    <p className="text-base text-gray-500">Enrolled On</p>
                                    <p className="text-lg text-gray-800">01-01-2025</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div>
                                    <p className="text-base text-gray-500">Total Fees</p>
                                    <p className="text-lg text-gray-800">Rs.5000/-</p>
                                </div>
                                <div className="mx-auto">
                                    <p className="text-base text-gray-500">Due Fees</p>
                                    <p className="text-lg text-gray-800">Rs.3500/-</p>
                                </div>
                            </div>
                            <div className="flex mt-6">
                                <div>
                                    <p className="text-base text-gray-500">Fees Status</p>
                                    <p className="text-lg text-gray-800">UNPAID</p>
                                </div>
                                <div className="mx-auto">
                                    <p className="text-base text-gray-500">Status</p>
                                    <p className="text-lg text-gray-800">ACTIVE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Documents</h5>
                    <p className="text-gray-500 mt-1">Add documents information</p>
                </div>
            </div>
        </>
    );
};