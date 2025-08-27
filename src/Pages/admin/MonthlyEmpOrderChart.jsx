import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import MenuOrderPie from "./MenuOrderPie";
import { useApiQuery } from "../../hooks/useQuery";
import FeedbackRecord from "./FeedbackRecord";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import MenuOrderBar from "./MenuOrderBar";

const MonthlyEmpOrderChart = ({ data = [] }) => {
  const [selectedEmp, setSelectedEmp] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Filter by employee and date
  const filteredData = data.filter((order) => {
    const matchesName = selectedEmp ? order.emp_name === selectedEmp : true;
    const matchesDate = selectedDate
      ? order.date?.startsWith(selectedDate)
      : true;
    return matchesName && matchesDate;
  });

  // Group by month and count menu orders
  const monthlyMenuCount = filteredData.reduce((acc, order) => {
    try {
      const rawDate = order.date;
      const parsedDate = parseISO(rawDate);
      const key = format(parsedDate, "yyyy-MM"); // for sorting
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
      month: format(parseISO(`${monthKey}-01`), "MMM"),
      menuCount: count,
    }));

  const uniqueNames = [...new Set(data.map((d) => d.emp_name))];

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
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">No data available</div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 w-full mb-4">
      {/* Bar Chart */}
      <Card className="w-[480px] rounded shadow p-4 text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
        <h3 className="text-lg text-gray-700 font-semibold mb-2 dark:text-white ">
          Monthly Employee Order Chart
        </h3>

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                label={{
                  value: "Menu Orders",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#333",
                  borderRadius: "8px",
                  color: "#fff",
                  border: "none",
                }}
                labelStyle={{ color: "#fff", fontWeight: "bold" }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="menuCount" fill="#0049FF" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-700 dark:text-white text-center">
            No data to display
          </p>
        )}
      </Card>

      <div>
        <MenuOrderBar detailData={data} />
      </div>
    </div>
  );
};

export default MonthlyEmpOrderChart;
