export default function StudentPaymentSummaryCard({
    studentName = "Alice",
    courseName = "Web Development",
    batchName = "Batch A",
    enrolledOn = "2025-01-01",
}: {
    studentName?: string,
    courseName?: string,
    batchName?: string,
    enrolledOn?: string,
}) {
    return (
        <>
            <div className="bg-blue-50 rounded-xl shadow p-4 mb-4 border border-blue-100 grid grid-cols-2 gap-8">
                <div>
                    <div>
                        <p className="text-gray-600">Student</p>
                        <p className="font-bold text-gray-700 text-lg">{studentName}</p>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-600">Course</p>
                        <p className="font-bold text-gray-700 text-lg">{courseName}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p className="text-gray-600">Batch</p>
                        <p className="font-bold text-gray-700 text-lg">{batchName}</p>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-600">Enrolled On</p>
                        <p className="font-bold text-gray-700 text-lg">{enrolledOn}</p>
                    </div>
                </div>
            </div>
        </>
    );
};