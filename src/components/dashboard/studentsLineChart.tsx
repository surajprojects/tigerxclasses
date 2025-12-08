"use client";

import { Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
    { month: "Jan", numberOfStudents: 40 },
    { month: "Feb", numberOfStudents: 55 },
    { month: "Mar", numberOfStudents: 33 },
    { month: "Apr", numberOfStudents: 80 },
    { month: "May", numberOfStudents: 50 },
    { month: "Jun", numberOfStudents: 60 },
];

function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload || !payload.length) return null;

    const item = payload[0];
    const numberOfStudents = item?.numberOfStudents ?? item?.payload?.numberOfStudents ?? null;

    if (numberOfStudents == null) return null;

    return (
        <div className="bg-white/95 px-3 py-2 rounded shadow-sm border border-gray-200">
            <div className="text-gray-500 text-xs font-medium mb-1">
                {label}
            </div>
            <div className="text-blue-600 text-xs font-semibold">
                Students : {numberOfStudents.toLocaleString()}
            </div>
        </div>
    );
};

export default function StudentsLineChart({ studentsData = data }: { studentsData?: { month: string, numberOfStudents: number }[] }) {
    return (
        <>
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={studentsData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            strokeOpacity={0.6}
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                        />
                        <YAxis
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            stroke="none"
                            type="monotone"
                            dataKey="numberOfStudents"
                            fill="url(#blueGradient)"
                        />
                        <Line
                            dot={false}
                            type="monotone"
                            dataKey="numberOfStudents"
                            stroke="#3b82f6"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};