import getUsers from "@/lib/server/getUsers";
import UsersTable from "@/components/users/usersTable";
import AddUserBtn from "@/components/button/users/addUserBtn";

export default async function Admin() {
    const allUsers = await getUsers();
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h6 className="text-4xl text-gray-800 font-bold">Users</h6>
                        <p className="my-1 font-medium text-gray-500 text-lg">Manage all users</p>
                    </div>
                    <AddUserBtn />
                </div>
                <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-sm mt-4">
                    <div className="mb-2">
                        <p className="text-lg font-bold text-gray-800">All Users</p>
                        <p className="text-sm font-medium text-gray-500">{allUsers && allUsers.length} Users found</p>
                    </div>
                    <UsersTable allUsers={allUsers} />
                </div>
            </div>
        </>
    );
};