import React, { useState, useMemo } from "react";
import { useApiQuery } from "../../hooks/useQuery";
import { Card } from "flowbite-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0FC47F", "#FF4C4C"]; // Green: present, Red: absent

const MealAttendanceDonut = () => {
  const { data: attendanceData = [] } = useApiQuery(
    {
      endpoint: "/attendance/list-admin",
      queryKey: ["attendance"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Extract unique employee names and months
  const employeeOptions = attendanceData.map((emp) => ({
    name: emp.emp_name,
    id: emp.emp_id,
  }));

  const allDates = attendanceData.flatMap((emp) =>
    emp.attendances.map((a) => a.date.slice(0, 7))
  );
  const uniqueMonths = [...new Set(allDates)];

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(employeeOptions[0]?.id || "");
  const [selectedMonth, setSelectedMonth] = useState(uniqueMonths[0] || "");

  const selectedEmployee = attendanceData.find((emp) => emp.emp_id === selectedEmployeeId);

  const { present, absent } = useMemo(() => {
    if (!selectedEmployee) return { present: 0, absent: 0 };

    const filtered = selectedEmployee.attendances.filter((a) =>
      a.date.startsWith(selectedMonth)
    );

    return filtered.reduce(
      (acc, curr) => {
        if (curr.status === "present") acc.present += 1;
        else if (curr.status === "absent") acc.absent += 1;
        return acc;
      },
      { present: 0, absent: 0 }
    );
  }, [selectedEmployee, selectedMonth]);

  const chartData = [
    { name: "Present (Ate Meal)", value: present },
    { name: "Absent (Missed Meal)", value: absent },
  ];

  return (
    <Card className="w-full max-w-md mx-auto mt-4 ml-0">
      <h5 className="text-xl font-bold text-center text-gray-700 dark:text-white mb-4">
        Employee Meal Attendance
      </h5>

      {/* Filter Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-4 ">
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        >
            
          {employeeOptions.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
{/* 
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        >
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select> */}
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded ml-2 text-gray-800 dark:text-white dark:bg-gray-800 bg-white"
        />
      </div>

      {present + absent > 0 ? (
        <PieChart width={320} height={250}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            nameKey="name"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      ) : (
        <p className="text-center text-gray-500 text-sm mt-4">
          No data available for this employee in selected month.
        </p>
      )}
    </Card>
  );
};

export default MealAttendanceDonut;
