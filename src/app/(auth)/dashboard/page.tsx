export default function Dashboard() {
    return (
        <>
            <div className="w-full h-16 px-12 flex justify-between items-center font-medium text-gray-700 border-b border-gray-200">
                <div>
                    <p>Dashboard</p>
                </div>
                <ul className="flex">
                    <li className="mx-2" >Notification</li>
                    <li className="mx-2" >Settings</li>
                    <li className="mx-2" >Account</li>
                </ul>
            </div>
        </>
    );
};