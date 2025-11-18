import Card from "@/components/card/card";
import getStudent from "@/lib/server/getStudent";
import BackBtn from "@/components/button/backBtn";
import CardData from "@/components/card/cardData";
import CardBody from "@/components/card/cardBody";
import CardHeader from "@/components/card/cardHeader";
import DocumentCard from "@/components/card/documentCard";
import StudentCourseCard from "@/components/card/studentCourseCard";
import EditStudentBtn from "@/components/button/student/editStudentBtn";
import AddDocumentBtn from "@/components/button/student/addDocumentBtn";
import AddStudentCourseBtn from "@/components/button/course/addStudentCourseBtn";

export default async function StudentProfile({
    params,
}: {
    params: Promise<{ studentId: string }>
}) {
    const { studentId } = await params;
    const studentData = await getStudent(studentId);

    if (!studentData) {
        return <p className="italic text-red-500 font-semibold">Student not found!!!</p>;
    }

    return (
        <>
            <div>
                <div className="flex items-center">
                    <BackBtn />
                    <p className="flex-1 text-3xl font-bold text-gray-800 mx-4">Alice Johnson</p>
                    <EditStudentBtn studentId={studentId} />
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
                                <li className="text-gray-500">Active Courses</li>
                                <li className="text-gray-800 font-semibold text-lg">2</li>
                            </ul>
                        </li>
                        <li>
                            <div className="border rounded-full p-8"></div>
                        </li>
                    </ul>
                </div>

                {/* Personal Information */}
                <Card key={1}>
                    <CardHeader
                        title="Personal Information"
                        description="Basic student details"
                    />
                    <CardBody>
                        {/* Full Name */}
                        <CardData key={1} fieldName="Full Name" fieldValue={studentData.fullName} />
                        {/* Date of Birth */}
                        <CardData key={2} fieldName="Date of Birth" fieldValue={studentData.dob.split("T")[0]} />
                        {/* Gender */}
                        <CardData key={3} fieldName="Gender" fieldValue={studentData.gender} />
                        {/* Category */}
                        <CardData key={4} fieldName="Category" fieldValue={studentData.category} />
                        {/* Mobile No */}
                        <CardData key={5} fieldName="Mobile No." fieldValue={studentData.mobileNo} />
                        {/* Email */}
                        <CardData key={6} fieldName="Email" fieldValue={studentData.email} />
                    </CardBody>
                </Card>

                {/* Address Information */}
                <Card key={2}>
                    <CardHeader
                        title="Address Information"
                        description="Student address details"
                    />
                    <CardBody>
                        {/* Flat/House/Building */}
                        <CardData key={1} fieldName="Flat/House/Building" fieldValue={studentData.address.flatHouseBuilding} />
                        {/* Street/Area */}
                        <CardData key={2} fieldName="Street/Area" fieldValue={studentData.address.streetOrArea} />
                        {/* Landmark */}
                        <CardData key={3} fieldName="Landmark" fieldValue={studentData.address.landmark} />
                        {/* City */}
                        <CardData key={4} fieldName="City" fieldValue={studentData.address.city} />
                        {/* State */}
                        <CardData key={5} fieldName="State" fieldValue={studentData.address.state} />
                        {/* Pincode */}
                        <CardData key={6} fieldName="Pincode" fieldValue={studentData.address.pincode} />
                    </CardBody>
                </Card>

                {/* Family Information */}
                <Card key={3}>
                    <CardHeader
                        title="Family Information"
                        description="Parent and guardian details"
                    />
                    <CardBody>
                        {/* Father Name */}
                        <CardData key={1} fieldName="Father Name" fieldValue={studentData.fatherName} />
                        {/* Mother Name */}
                        <CardData key={2} fieldName="Mother Name" fieldValue={studentData.motherName} />
                        {/* Parent/Guardian Mobile No. 1 */}
                        <CardData key={3} fieldName="Parent/Guardian Mobile No. 1" fieldValue={studentData.parentGuardianMobileNo1} />
                        {/* Parent/Guardian Mobile No. 2 */}
                        <CardData key={4} fieldName="Parent/Guardian Mobile No. 2" fieldValue={studentData.parentGuardianMobileNo2} />
                    </CardBody>
                </Card>

                {/* Academic Information */}
                <Card key={4}>
                    <CardHeader
                        title="Academic Information"
                        description="Student's current academic details"
                    />
                    <CardBody>
                        {/* Class */}
                        <CardData key={1} fieldName="Class" fieldValue={studentData.class} />
                        {/* Institute */}
                        <CardData key={2} fieldName="Institute" fieldValue={studentData.institute} />
                        {/* Institute Name */}
                        <CardData key={3} fieldName="Institute Name" fieldValue={studentData.instituteName} />
                        {/* Session */}
                        <CardData key={4} fieldName="Session" fieldValue={studentData.session} />
                    </CardBody>
                </Card>

                {/* Enrolled Courses */}
                <Card key={5}>
                    <div className="flex justify-between items-center">
                        <CardHeader
                            title="Enrolled Courses"
                            description="All courses information"
                        />
                        <AddStudentCourseBtn studentId={studentId} />
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-6">
                        {studentData.studentCourses.length > 0 && studentData.studentCourses.map((studentCourse) => {
                            return <StudentCourseCard
                                key={studentCourse.id}
                                studentId={studentId}
                                studentCourseData={studentCourse}
                            />;
                        })}
                    </div>
                </Card>

                {/* Documents */}
                <Card key={6}>
                    <div className="flex justify-between items-center">
                        <CardHeader
                            title="Documents"
                            description="All documents information"
                        />
                        <AddDocumentBtn />
                    </div>
                    <div className="mt-6">
                        <DocumentCard />
                        <DocumentCard />
                        <DocumentCard />
                    </div>
                </Card>
            </div>
        </>
    );
};