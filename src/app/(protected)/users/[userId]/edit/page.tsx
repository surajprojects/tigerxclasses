import getUser from "@/lib/server/getUser";
import BackBtn from "@/components/button/backBtn";
import UserEditForm from "@/components/users/admin/userEditForm";
import StudentPageHeader from "@/components/students/studentPageHeader";

export default async function EditUser({
    params,
}: {
    params: Promise<{ userId: string }>
}) {
    const { userId } = await params;
    const userData = await getUser(userId);

    if (!userData) {
        return <p className="italic text-red-500 font-semibold">User not found!!!</p>;
    }

    return (
        <>
            <div>
                <div className="flex items-center">
                    <BackBtn />
                    <StudentPageHeader title="Edit User" description="Update user information" />
                </div>
                <UserEditForm userId={userId} userData={userData} />
            </div>
        </>
    );
};