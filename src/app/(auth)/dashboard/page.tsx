import Card from "@/components/dashboard/card";
import { DollarSign } from "lucide-react";
import { BookOpenIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
    return (
        <>
            <div>
                <h6 className="text-4xl text-blue-500 font-bold">Dashboard</h6>
                <p className="my-2 font-medium text-gray-500 text-lg">Welcome back! Here's your management overview.</p>
                <div className="flex justify-between gap-8 my-8">
                    <Card className="bg-blue-50 text-blue-500" />
                    <Card className="bg-cyan-50 text-cyan-500">
                        <BookOpenIcon className="size-6" />
                    </Card>
                    <Card
                        title="Total Revenue"
                        data="$43,500"
                        description="+8% from last month"
                        className="bg-amber-50 text-amber-500"
                    >
                        <DollarSign className="size-6" />
                    </Card>
                    <Card className="bg-green-50 text-green-500">
                        <ArrowTrendingUpIcon className="size-6" />
                    </Card>
                </div>
            </div>
        </>
    );
};