import BackBtn from "@/components/button/backBtn";
import StudentNewForm from "@/components/students/studentNewForm";
import StudentPageHeader from "@/components/students/studentPageHeader";

export default function NewStudent() {
    return (
        <>
            <div>
                <div className="flex items-center">
                    <BackBtn />
                    <StudentPageHeader title="Add New Student" description="Fill in the details to add a new student" />
                </div>
                <StudentNewForm />
            </div>
        </>
    );
};