export default function StudentCourseCard() {
    return (
        <>
            <div className="w-full m-2 p-6 rounded-2xl shadow-sm hover:shadow-md bg-white font-medium">
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
        </>
    );
};