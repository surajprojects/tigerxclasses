import Link from "next/link";

export default function UsersTable({ allUsers }: { allUsers: any }) {
    return (
        <>
            <table className="w-full text-sm text-gray-500 text-center">
                <thead className="text-xs font-semibold text-gray-800 uppercase border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            S.No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Full Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Institute Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mobile No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Deleted
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {(allUsers && (allUsers.length > 0)) ? allUsers.map((user: any, idx: number) => {
                        return <tr key={user.id}
                            className="border-b border-gray-200 hover:bg-gray-100 duration-300 ease-out">
                            <td className="px-6 py-4">
                                {idx + 1}
                            </td>
                            <td className="px-6 py-4">
                                {user.fullName}
                            </td>
                            <td className="px-6 py-4">
                                {user.instituteName}
                            </td>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.mobileNo}
                            </td>
                            <td className="px-6 py-4">
                                {user.username}
                            </td>
                            <td className="px-6 py-4">
                                {user.status}
                            </td>
                            <td className="px-6 py-4">
                                {`${user.isDeleted}`}
                            </td>
                            <td className="px-6 py-4">

                            </td>
                        </tr>
                    })
                        :
                        <tr className="h-14"><td colSpan={9} className="text-center">No users found!!!</td></tr>
                    }
                </tbody>
            </table>
        </>
    );
};