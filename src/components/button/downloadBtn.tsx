import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function DownloadBtn() {
    return (
        <>
            <button
                type="button"
                className="font-medium flex items-center hover:bg-blue-500 px-3 py-1 rounded-lg duration-300 ease-out cursor-pointer hover:text-white"
            >
                <ArrowDownTrayIcon className="size-4 mr-2" />
                Download
            </button>
        </>
    );
};