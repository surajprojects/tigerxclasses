import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function EditStudentBtn({ studentId = "id" }: { studentId?: string }) {
    return (
        <>
            <Link
                href={`/students/${studentId}/edit`}
                className="text-white bg-blue-500 rounded-xl px-3 py-2 font-medium duration-300 ease-out cursor-pointer hover:bg-blue-500/90 h-fit w-fit flex items-center justify-center text-sm"
            >
                <PencilIcon className="size-4 mr-2" />
                Edit Student
            </Link>
        </>
    );
};