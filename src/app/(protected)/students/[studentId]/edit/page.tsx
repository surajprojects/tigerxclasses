import getStudent from "@/lib/server/getStudent";
import BackBtn from "@/components/button/backBtn";
import StudentEditForm from "@/components/students/studentEditForm";
import StudentPageHeader from "@/components/students/studentPageHeader";

export default async function EditStudent({
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
                    <StudentPageHeader title="Edit Student" description="Update student information" />
                </div>
                <StudentEditForm studentId={studentId} studentData={studentData} />
            </div>
        </>
    );
};