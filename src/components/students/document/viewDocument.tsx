import CardData from "@/components/card/cardData";

export default function ViewDocument() {
    return (
        <>
            <ul className="mt-4 mx-6 gap-3 grid grid-cols-2 duration-300 ease-out">
                <CardData fieldName="Document Type" fieldValue="Aadhaar" />
                <li>
                    <ul>
                        <li className="text-gray-500">Document Name</li>
                        <li className="text-gray-800 font-semibold text-lg">Aadhaar</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Institute</li>
                        <li className="text-gray-800 font-semibold text-lg">Aadhaar Centre</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Institute Name</li>
                        <li className="text-gray-800 font-semibold text-lg">GOVT</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Institute Name</li>
                        <li className="text-gray-800 font-semibold text-lg">GOVT</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Id No.</li>
                        <li className="text-gray-800 font-semibold text-lg">123456</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Roll No.</li>
                        <li className="text-gray-800 font-semibold text-lg">123456</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Enrollment No.</li>
                        <li className="text-gray-800 font-semibold text-lg">123456</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Obtained Marks</li>
                        <li className="text-gray-800 font-semibold text-lg">450</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Total Marks</li>
                        <li className="text-gray-800 font-semibold text-lg">500</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Percentage</li>
                        <li className="text-gray-800 font-semibold text-lg">90%</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Session</li>
                        <li className="text-gray-800 font-semibold text-lg">MAY 2025</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li className="text-gray-500">Created On</li>
                        <li className="text-gray-800 font-semibold text-lg">01-01-2025</li>
                    </ul>
                </li>
            </ul>
        </>
    );
};