import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';
import MenuOrderPie from './MenuOrderPie';
import { useApiQuery } from '../../hooks/useQuery';
import FeedbackRecord from './FeedbackRecord';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import MenuOrderBar from './MenuOrderBar';



const MonthlyEmpOrderChart = ({ data = [] }) => {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Filter by employee and date
  const filteredData = data.filter(order => {
    const matchesName = selectedEmp ? order.emp_name === selectedEmp : true;
    const matchesDate = selectedDate ? order.date?.startsWith(selectedDate) : true;
    return matchesName && matchesDate;
  });

  // Group by month and count menu orders
  const monthlyMenuCount = filteredData.reduce((acc, order) => {
    try {
      const rawDate = order.date;
      const parsedDate = parseISO(rawDate);
      const key = format(parsedDate, 'yyyy-MM'); // for sorting
      if (!acc[key]) acc[key] = 0;
      acc[key] += 1; // count every menu order
    } catch (err) {
      console.warn("Invalid date in order:", order);
    }
    return acc;
  }, {});

  const chartData = Object.entries(monthlyMenuCount)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([monthKey, count]) => ({
      month: format(parseISO(`${monthKey}-01`), 'MMM'),
      menuCount: count,
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
          className="p-2 border border-gray-300 rounded w-50 text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
        >
          <option value="" className='text-gray-800 dark:text-white  '>All Employees</option>
          {uniqueNames.map(name => (
            <option key={name} className='text-gray-800 dark:text-white' value={name}>{name}</option>
          ))}
        </select>

        <input
          type="month"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded ml-2 text-gray-800 dark:text-white dark:bg-gray-800 bg-white"
        />
      </div>

      <div className="flex  flex-wrap gap-4 w-full mb-4">
        {/* Bar Chart */}
        <div className=" w-[450px]  rounded shadow p-4 text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
          <h2 className="text-xl font-semibold">Monthly Employee Order Chart</h2>
          {/* <Link to="viewEmpOrderDetail">
            <Button>Details</Button>
          </Link> */}
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'Menu Orders', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#333', borderRadius: '8px', color: '#fff', border: 'none' }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="menuCount" fill="#0049FF" />              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-700 dark:text-white text-center">No data to display for this Month</p>
          )}
        </div>

        {/* Pie Chart */}
        <div className=" w-[550px]  rounded shadow p-4 text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
          <h3 className="text-lg font-semibold mb-2">Menu Ordered Dishes by Employee</h3>
          {/* <MenuOrderPie detailData={filteredData} /> */}
          <MenuOrderBar detailData={filteredData} />

        </div>
      </div>
    </>
  );
};

export default MonthlyEmpOrderChart;
