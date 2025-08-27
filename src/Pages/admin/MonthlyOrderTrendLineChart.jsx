import React from "react";
import { Card } from "flowbite-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useApiQuery } from "../../hooks/useQuery";

const MonthlyOrderTrend = () => {
  const { data = [] } = useApiQuery(
    {
      endpoint: "/registered-orders/lists",
      queryKey: ["orders"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // ---- Transform API data into monthly counts ----
  const monthlyOrderMap = data.reduce((acc, curr) => {
    if (!curr.date) return acc; 

    const dateObj = new Date(curr.date);
    const monthKey = dateObj.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    acc[monthKey] = (acc[monthKey] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyOrderMap).map(([month, orders]) => ({
    month,
    orders,
  }));

  if (chartData.length === 0) {
    return (
      <Card className="w-full">
        <p className="text-gray-700 dark:text-white mt-4 text-center">
          No data available
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <h3 className="text-lg font-semibold mb-4 dark:text-white text-gray-700">Monthly Order Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderRadius: "8px",
              color: "#fff",
              border: "none",
            }}
            labelStyle={{ color: "#fff", fontWeight: "bold" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5, fill: "#3b82f6" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyOrderTrend;
