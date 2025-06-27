import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#dc2626"];

const RatingPieChart = ({ data= []  }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Pie Chart */}
      <div className="w-full md:w-2/3 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary List */}
      <div className="w-full md:w-1/3 flex flex-col justify-center">
        <h3 className="text-md font-semibold mb-2">Rating Summary</h3>
        <ul className="space-y-1 text-sm">
          {data.map((entry, index) => (
            <li key={index} className="text-gray-800 dark:text-gray-100">
              <span className="font-medium">{entry.name}</span> – {entry.value}{" "}
              {entry.value === 1 ? "entry" : "entries"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RatingPieChart;
