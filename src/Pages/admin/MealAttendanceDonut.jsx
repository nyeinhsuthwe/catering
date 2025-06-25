import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C49F', '#FF6B6B']; // Green for present, red for absent

const MealAttendanceDonut = ({ attendanceData }) => {
    if (!attendanceData || attendanceData.length === 0) return null;

    const count = attendanceData.reduce(
        (acc, curr) => {
            if (curr.status === 'present') acc.present += 1;
            else if (curr.status === 'absent') acc.absent += 1;
            return acc;
        },
        { present: 0, absent: 0 }
    );

    const chartData = [
        { name: 'Present', value: count.present },
        { name: 'Absent', value: count.absent }
    ];

    return (
        <div className="w-full md:w-1/2 mx-auto mt-6">
            <h3 className="text-center text-lg font-bold mb-2">Meal Attendance Summary</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ name, value }) => `${name}: ${value}`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MealAttendanceDonut;
