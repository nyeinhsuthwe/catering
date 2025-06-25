import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EF7', '#F67280'];

const MenuOrderBar = ({ detailData }) => {
    // Group food items and count frequency
    const foodCountMap = detailData.reduce((acc, curr) => {
        acc[curr.food_name] = (acc[curr.food_name] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(foodCountMap).map(([name, value]) => ({
        name,
        value,
    }));

    if (chartData.length === 0) {
        return <p className="text-gray-500 mt-4">No orders available</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MenuOrderBar;
