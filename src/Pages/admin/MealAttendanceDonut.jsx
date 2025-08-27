import React, { useState, useMemo, useEffect } from "react";
import { useApiQuery } from "../../hooks/useQuery";
import { Card } from "flowbite-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4F772D", "#EE9B00"];

const MealAttendanceDonut = () => {
  const { data: attendanceData = [] } = useApiQuery(
    { endpoint: "/attendance/list-admin", queryKey: ["attendance"] },
    { refetchOnWindowFocus: false }
  );

  // Employee & month filter states
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
  const allDates = attendanceData.flatMap((emp) =>
    emp.attendances.map((a) => a.date.slice(0, 7))
  );
  const uniqueMonths = [...new Set(allDates)];
  const [selectedMonth, setSelectedMonth] = useState(uniqueMonths[0] || "");

  // Update selected month when attendanceData changes
  useEffect(() => {
    if (uniqueMonths.length && !uniqueMonths.includes(selectedMonth)) {
      setSelectedMonth(uniqueMonths[0]);
    }
  }, [uniqueMonths]);

  const employeeOptions = [
    { name: "All Employees", id: "all" },
    ...attendanceData.map((emp) => ({ name: emp.emp_name, id: emp.emp_id })),
  ];

  // Compute present/absent counts
  const { present, absent } = useMemo(() => {
    if (!attendanceData.length) return { present: 0, absent: 0 };

    const filteredEmployees =
      selectedEmployeeId === "all"
        ? attendanceData
        : attendanceData.filter((emp) => emp.emp_id === selectedEmployeeId);

    let presentCount = 0,
      absentCount = 0;

    filteredEmployees.forEach((emp) => {
      emp.attendances
        .filter((a) => a.date.startsWith(selectedMonth))
        .forEach((a) => {
          if (a.status === "present") presentCount += 1;
          else if (a.status === "absent") absentCount += 1;
        });
    });

    return { present: presentCount, absent: absentCount };
  }, [attendanceData, selectedEmployeeId, selectedMonth]);

  const chartData = [
    { name: "Present (Ate Meal)", value: present },
    { name: "Absent (Missed Meal)", value: absent },
  ];

  return (
    <Card className="w-full mx-auto">
      <h5 className="text-xl font-bold text-center text-gray-700 dark:text-white mb-4">
        Employee Meal Attendance
      </h5>

      {/* Filters */}
      <div className="flex gap-4 justify-center mb-4 flex-wrap">
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="border rounded px-3 py-2 text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
        >
          {employeeOptions.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border px-3 py-2 rounded text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
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
          <Legend verticalAlign="bottom" />
        </PieChart>
      ) : (
        <p className="text-center text-gray-500 text-sm mt-4">
          No data available for selected employee/month.
        </p>
      )}
    </Card>
  );
};

export default MealAttendanceDonut;
