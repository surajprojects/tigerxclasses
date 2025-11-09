export default function Table() {
    return (
        <>
            <table className="w-full text-sm text-gray-500 text-center">
                <thead className="text-xs font-semibold text-gray-800 uppercase border-b border-gray-200">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            S.No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Student Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Father Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mobile No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Course
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Batch
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Enrolled On
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-100 duration-300 ease-out">
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4 capitalize font-semibold">
                            Alice
                        </td>
                        <td className="px-6 py-4 capitalize">
                            Bob
                        </td>
                        <td className="px-6 py-4">
                            123456789
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf644
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf66
                        </td>
                        <td className="px-6 py-4">
                            16-16-16
                        </td>
                        <td className="px-6 py-4">
                            active
                        </td>
                        <td className="px-6 py-4">
                            Action
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-100 duration-300 ease-out">
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4 capitalize font-bold">
                            Alice
                        </td>
                        <td className="px-6 py-4 capitalize">
                            Bob
                        </td>
                        <td className="px-6 py-4">
                            123456789
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf644
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf66
                        </td>
                        <td className="px-6 py-4">
                            16-16-16
                        </td>
                        <td className="px-6 py-4">
                            active
                        </td>
                        <td className="px-6 py-4">
                            Action
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-100 duration-300 ease-out">
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4 capitalize font-bold">
                            Alice
                        </td>
                        <td className="px-6 py-4 capitalize">
                            Bob
                        </td>
                        <td className="px-6 py-4">
                            123456789
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf644
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf66
                        </td>
                        <td className="px-6 py-4">
                            16-16-16
                        </td>
                        <td className="px-6 py-4">
                            active
                        </td>
                        <td className="px-6 py-4">
                            Action
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-100 duration-300 ease-out">
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4 capitalize font-bold">
                            Alice
                        </td>
                        <td className="px-6 py-4 capitalize">
                            Bob
                        </td>
                        <td className="px-6 py-4">
                            123456789
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf644
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf66
                        </td>
                        <td className="px-6 py-4">
                            16-16-16
                        </td>
                        <td className="px-6 py-4">
                            active
                        </td>
                        <td className="px-6 py-4">
                            Action
                        </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-100 duration-300 ease-out">
                        <td className="px-6 py-4">
                            1
                        </td>
                        <td className="px-6 py-4 capitalize font-bold">
                            Alice
                        </td>
                        <td className="px-6 py-4 capitalize">
                            Bob
                        </td>
                        <td className="px-6 py-4">
                            123456789
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf644
                        </td>
                        <td className="px-6 py-4">
                            sdfsdf66
                        </td>
                        <td className="px-6 py-4">
                            16-16-16
                        </td>
                        <td className="px-6 py-4">
                            active
                        </td>
                        <td className="px-6 py-4">
                            Action
                        </td>
                    </tr>
                    {/* <tr className="h-14"><td colSpan={11} className="text-center">No students found!!!</td></tr> */}
                </tbody>
            </table>
        </>
    );
};