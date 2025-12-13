import { Cell, PieChart, Pie, Tooltip, ResponsiveContainer, PieLabelRenderProps } from "recharts";

export default function FeesPieChart({
    firstName = "Paid",
    firstValue = 75,
    firstColor = "3b82f6",
    secondName = "Pending",
    secondValue = 25,
    secondColor = "f59e0b",
}: {
    firstName?: string,
    firstValue?: number,
    firstColor?: string,
    secondName?: string,
    secondValue?: number,
    secondColor?: string,
}) {
    if (firstValue < 1 && secondValue < 1) {
        return (
            <>
                <p>No data available!</p>
            </>
        );
    }

    const data = [
        { name: firstName, value: firstValue },
        { name: secondName, value: secondValue },
    ];
    const COLORS = [`#${firstColor}`, `#${secondColor}`,];

    return (
        <>
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Tooltip formatter={(value: number) => [`₹${value.toLocaleString()}/-`, "Amount"]} />
                        <Pie
                            data={data}
                            nameKey="name"
                            dataKey="value"
                            outerRadius="70%"
                            label={(props: PieLabelRenderProps) =>
                                `${props.name}: ${(props.percent! * 100).toFixed(0)}%`
                            }
                            labelLine={false}
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};