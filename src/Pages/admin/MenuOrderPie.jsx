import React from 'react'
import { useApiQuery } from "../../hooks/useQuery";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";


const MenuOrderPie = () => {
    const { data: employeeMenuOrders } = useApiQuery(
        {
            endpoint: "/dashboard/MonthlyOrderCounts", //count of menu orders by employee
            queryKey: ["employeeMenuPie"],
        },
        {
            refetchOnWindowFocus: false,
        }
    );
    console.log("Employee Menu Orders Data:", employeeMenuOrders);
    if (!employeeMenuOrders || employeeMenuOrders.length === 0) {
        return <div className="p-6 bg-white rounded-lg shadow-md">No data available</div>;
    }



    return (
        <div>
            {employeeMenuOrders?.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Employee Menu Orders (Pie Chart)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={employeeMenuOrders}
                                dataKey="count"
                                nameKey="food_name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ name, percent }) =>
                                    `${name} (${(percent * 100).toFixed(0)}%)`
                                }
                            >
                                {employeeMenuOrders.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"][index % 5]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

        </div>
    )
}

export default MenuOrderPie
