import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';
import MenuOrderPie from './MenuOrderPie';
import { useApiQuery } from '../../hooks/useQuery';
import FeedbackRecord from './FeedbackRecord'; 
import { Button } from 'flowbite-react';



const MonthlyEmpOrderChart = ({ data = [] }) => {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Filter by employee and date
  const filteredData = data.filter(order => {
    const matchesName = selectedEmp ? order.emp_name === selectedEmp : true;
    const matchesDate = selectedDate ? order.date?.startsWith(selectedDate) : true;
    return matchesName && matchesDate;
  });

  // Group by month and count unique employee orders
  const monthlyOrderCount = filteredData.reduce((acc, order) => {
    try {
      const rawDate = order.date;
      const parsedDate = parseISO(rawDate);
      const key = format(parsedDate, 'yyyy-MM'); // for sorting
      if (!acc[key]) acc[key] = new Set();
      acc[key].add(order.emp_id);
    } catch (err) {
      console.warn("Invalid date in order:", order);
    }
    return acc;
  }, {});

  const chartData = Object.entries(monthlyOrderCount)
    .sort(([a], [b]) => new Date(a) - new Date(b)) // sort by real date
    .map(([monthKey, empSet]) => ({
      month: format(parseISO(`${monthKey}-01`), 'MMM'), // convert to Jan, Feb
      employeeCount: empSet.size,
    }));

  const uniqueNames = [...new Set(data.map(d => d.emp_name))];

  const { data: employeeMenuOrders } = useApiQuery(
    {
      endpoint: "/dashboard/MonthlyOrderCounts",
      queryKey: ["employeeMenuPie"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!employeeMenuOrders || employeeMenuOrders.length === 0) {
    return <div className="p-6 bg-white rounded-lg shadow-md">No data available</div>;
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-4  ">
        <select
          value={selectedEmp}
          onChange={(e) => setSelectedEmp(e.target.value)}
          className="p-2 border border-gray-300 rounded w-50"
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

      <div className="flex  flex-wrap gap-4 w-full mb-4">
        {/* Bar Chart */}
        <div className=" w-[400px] bg-white rounded shadow p-4 ">
          <h2 className="text-lg font-semibold mb-2">Monthly Employee Order Chart</h2>
          {/* <Button size="sm" onClick={() => navigate('../report/ViewEmpOrderDetail')} >
                   Details
                  </Button> */}
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Employees Ordered', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="employeeCount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center">No data to display for this Month</p>
          )}
        </div>

        {/* Pie Chart */}
        <div className="w-[550px] bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Top Ordered Dishes by Employee</h3>
          <MenuOrderPie detailData={filteredData} />
          
        </div>
      </div>
    </>
  );
};

export default MonthlyEmpOrderChart;
