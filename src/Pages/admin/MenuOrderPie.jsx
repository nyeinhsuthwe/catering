import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EF7', '#F67280'];

const MenuOrderPie = ({ detailData }) => {
    // Group food items and count frequency
    const foodCountMap = detailData.reduce((acc, curr) => {
        acc[curr.food_name] = (acc[curr.food_name] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(foodCountMap).map(([name, value]) => ({
        name,
        value
    }));

    if (chartData.length === 0) {
        return <p className="text-gray-500 mt-4">No orders available </p>;
    }

    return (
          <>
            
            {/* <Button size="sm" onClick={() => navigate('menuListTable')} >
                               Details
                              </Button> */}
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                            `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
};

export default MenuOrderPie;
