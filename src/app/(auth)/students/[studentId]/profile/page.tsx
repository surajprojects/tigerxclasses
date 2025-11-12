"use client"

import { useState } from "react";
import AddCourse from "@/components/students/course/addCourse";
import { PlusIcon, ArrowLeftIcon, ArrowDownTrayIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import NewDocument from "@/components/students/document/newDocument";
import ViewDocument from "@/components/students/document/viewDocument";

export default function StudentProfile() {
    const [showCourseForm, setShowCourseForm] = useState<boolean>(false);
    const [showDocumentForm, setShowDocumentForm] = useState<boolean>(false);
    const [showDocForm, setShowDocForm] = useState<boolean>(false);
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

                <div className="bg-blue-50 p-6 rounded-2xl my-8 shadow-sm">
                    <ul className="flex justify-between items-center">
                        <li>
                            <ul>
                                <li className="text-gray-500">Status</li>
                                <li className="text-gray-800 font-semibold text-lg">Active</li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li className="text-gray-500">Acitve Courses</li>
                                <li className="text-gray-800 font-semibold text-lg">2</li>
                            </ul>
                        </li>
                        <li>
                            <div className="border rounded-full p-8"></div>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Personal Information</h5>
                    <p className="text-gray-500 mt-1">Basic student details</p>
                    <ul className="my-6 gap-3 grid grid-cols-2">
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Full Name</li>
                                <li className="text-gray-800 font-semibold text-lg">Alice Johnson</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Date of Birth</li>
                                <li className="text-gray-800 font-semibold text-lg">23-08-2025</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Gender</li>
                                <li className="text-gray-800 font-semibold text-lg">Male</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Category</li>
                                <li className="text-gray-800 font-semibold text-lg">ST</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Mobile No</li>
                                <li className="text-gray-800 font-semibold text-lg">1234567980</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Email</li>
                                <li className="text-gray-800 font-semibold text-lg">suraj23082002@gmail.com</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Address Information</h5>
                    <p className="text-gray-500 mt-1">Student address details</p>
                    <ul className="my-6 gap-3 grid grid-cols-2">
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Country</li>
                                <li className="text-gray-800 font-semibold text-lg">India</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Street/Area</li>
                                <li className="text-gray-800 font-semibold text-lg">Pali Road Salapura</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Landmark</li>
                                <li className="text-gray-800 font-semibold text-lg">eg Near Hospital</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">City</li>
                                <li className="text-gray-800 font-semibold text-lg">Sheopur</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">State</li>
                                <li className="text-gray-800 font-semibold text-lg">Madhya Pradesh</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Pin</li>
                                <li className="text-gray-800 font-semibold text-lg">476337</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Family Information</h5>
                    <p className="text-gray-500 mt-1">Parent and guardian details</p>
                    <ul className="my-6 gap-3 grid grid-cols-2">
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Father Name</li>
                                <li className="text-gray-800 font-semibold text-lg">Alice Johnson</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Mother Name</li>
                                <li className="text-gray-800 font-semibold text-lg">Alice Johnson</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Guardian Mobile No 1</li>
                                <li className="text-gray-800 font-semibold text-lg">1234567980</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Guardian Mobile No 2</li>
                                <li className="text-gray-800 font-semibold text-lg">1234567980</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <h5 className="text-2xl font-medium text-gray-800">Academic Information</h5>
                    <p className="text-gray-500 mt-1">Student's current academic details</p>
                    <ul className="my-6 gap-3 grid grid-cols-2">
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Class</li>
                                <li className="text-gray-800 font-semibold text-lg">12th</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Institute</li>
                                <li className="text-gray-800 font-semibold text-lg">School</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Institute Name</li>
                                <li className="text-gray-800 font-semibold text-lg">Govt Excellence School</li>
                            </ul>
                        </li>
                        {/*  */}
                        <li>
                            <ul>
                                <li className="text-gray-500">Session</li>
                                <li className="text-gray-800 font-semibold text-lg">2025-26</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl my-8 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="text-2xl font-medium text-gray-800">Enrolled Courses</h5>
                            <p className="text-gray-500 mt-1">All courses information</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowCourseForm(true)}
                            className="text-white bg-blue-500 rounded-xl px-4 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-400 h-fit w-fit flex items-center justify-center"
                        >
                            <PlusIcon className="size-5 mr-2" />
                            Add Course
                        </button>
                    </div>
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
                    <div className="flex justify-between items-center">
                        <div>
                            <h5 className="text-2xl font-medium text-gray-800">Documents</h5>
                            <p className="text-gray-500 mt-1">Add documents information</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowDocumentForm(true)}
                            className="text-white bg-blue-500 rounded-xl px-4 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-400 h-fit w-fit flex items-center justify-center"
                        >
                            <PlusIcon className="size-5 mr-2" />
                            Add Document
                        </button>
                    </div>
                    <div>
                        {/*  */}
                        <div className="border border-gray-200 w-full rounded-xl p-4 flex justify-between items-center hover:bg-gray-100 shadow-xs mt-5">
                            <div className="flex items-center">
                                <div className="mr-4 bg-blue-100 p-2.5 rounded-2xl text-blue-500">
                                    <DocumentTextIcon className="size-5" strokeWidth={1.8} />
                                </div>
                                <div>
                                    <p onClick={() => setShowDocForm((prevData) => !prevData)} className="font-semibold cursor-pointer">Aadhaar</p>
                                    <p className="text-xs text-gray-500 mt-1">2025-01-01</p>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="font-medium flex items-center hover:bg-blue-500 px-3 py-1 rounded-lg duration-300 ease-out cursor-pointer hover:text-white"
                                >
                                    <ArrowDownTrayIcon className="size-4 mr-2" />
                                    Download
                                </button>
                            </div>
                        </div>
                        {showDocForm && <ViewDocument />}
                        {/*  */}
                        <div className="border border-gray-200 w-full rounded-xl p-4 flex justify-between items-center hover:bg-gray-100 shadow-xs mt-5">
                            <div className="flex items-center">
                                <div className="mr-4 bg-blue-100 p-2.5 rounded-2xl text-blue-500">
                                    <DocumentTextIcon className="size-5" strokeWidth={1.8} />
                                </div>
                                <div>
                                    <p className="font-semibold">Aadhaar</p>
                                    <p className="text-xs text-gray-500 mt-1">2025-01-01</p>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="font-medium flex items-center hover:bg-blue-500 px-3 py-1 rounded-lg duration-300 ease-out cursor-pointer hover:text-white"
                                >
                                    <ArrowDownTrayIcon className="size-4 mr-2" />
                                    Download
                                </button>
                            </div>
                        </div>
                        {/*  */}
                        <div className="border border-gray-200 w-full rounded-xl p-4 flex justify-between items-center hover:bg-gray-100 shadow-xs mt-5">
                            <div className="flex items-center">
                                <div className="mr-4 bg-blue-100 p-2.5 rounded-2xl text-blue-500">
                                    <DocumentTextIcon className="size-5" strokeWidth={1.8} />
                                </div>
                                <div>
                                    <p className="font-semibold">Aadhaar</p>
                                    <p className="text-xs text-gray-500 mt-1">2025-01-01</p>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="font-medium flex items-center hover:bg-blue-500 px-3 py-1 rounded-lg duration-300 ease-out cursor-pointer hover:text-white"
                                >
                                    <ArrowDownTrayIcon className="size-4 mr-2" />
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showCourseForm && <AddCourse setShowForm={setShowCourseForm} />}
            {showDocumentForm && <NewDocument setShowForm={setShowDocumentForm} />}
        </>
    );
};