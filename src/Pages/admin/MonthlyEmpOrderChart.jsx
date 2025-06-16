// MonthlyEmpOrderChart.jsx
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { Menu } from 'lucide-react';
import MenuOrderPie from './MenuOrderPie';
import { useApiQuery } from '../../hooks/useQuery';
import { Cell, Pie, PieChart, Legend } from 'recharts';


const MonthlyEmpOrderChart = ({ data = [] }) => {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const filteredData = data.filter(order => {
    const matchesName = selectedEmp ? order.emp_name === selectedEmp : true;
    const matchesDate = selectedDate ? order.date?.startsWith(selectedDate) : true;
    return matchesName && matchesDate;
  });

  const monthlyOrderCount = filteredData.reduce((acc, order) => {
    try {
      const rawDate = order.date;
      const parsedDate = parseISO(rawDate);
      const month = format(parsedDate, 'yyyy-MM');
      if (!acc[month]) acc[month] = new Set();
      acc[month].add(order.emp_id);
    } catch (err) {
      console.warn("Invalid date in order:", order);
    }
    return acc;
  }, {});

  const chartData = Object.entries(monthlyOrderCount).map(([month, empSet]) => ({
    month,
    employeeCount: empSet.size,
  }));

  const uniqueNames = [...new Set(data.map(d => d.emp_name))];


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
    <div className="p-4 bg-white rounded shadow ">
      

      <div className="flex flex-wrap gap-4 mb-6">

        <select
          value={selectedEmp}
          onChange={(e) => setSelectedEmp(e.target.value)}
          className="border px-3 py-2 rounded ml-2 "
        >
          <option value="">All Employees</option>
          {uniqueNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <input
          type="month"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded ml-2"
        />
      </div>
      
        <div className="w-full md:w-1/2 ">
          <h2 className="text-lg font-semibold mb-2">Monthly Employee Order Chart</h2>

          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              {/* //100% for full widht */}
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Employees Ordered', angle: -90, position: 'center' }} />
                <Tooltip />
                <Bar dataKey="employeeCount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">No data to display for selected filters.</p>
          )}
        </div>
        
      

    </div>
  );
};

export default MonthlyEmpOrderChart;
