import Link from "next/link";
import StudentDeleteBtn from "./studentDeleteBtn";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function ActionStudentBtn({ studentId }: { studentId: string }) {
    return (
        <>
            <div className="flex">
                <Link
                    href={`/students/${studentId}/edit`}
                    className="text-blue-500 hover:bg-gray-200/70 p-1.5 rounded-xl cursor-pointer duration-300 ease-out outline-none mx-1"
                >
                    <PencilSquareIcon className="size-5" />
                </Link>
                <StudentDeleteBtn studentId={studentId} />
            </div>
        </>
    );
};