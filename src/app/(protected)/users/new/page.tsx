import BackBtn from "@/components/button/backBtn";
import UserNewForm from "@/components/users/admin/userNewForm";
import StudentPageHeader from "@/components/students/studentPageHeader";

export default function NewUser() {
    return (
        <>
            <div>
                <div className="flex items-center">
                    <BackBtn />
                    <StudentPageHeader title="Add New User" description="Fill in the details to add a new user" />
                </div>
                <UserNewForm />
            </div>
        </>
    );
};