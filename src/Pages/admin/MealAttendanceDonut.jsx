import React, { useMemo } from "react";
import { useApiQuery } from "../../hooks/useQuery";
import { Card } from "flowbite-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4F772D", "#EE9B00"];

const MealAttendanceDonut = ({ employeeId, month }) => {
  const { data: attendanceData = [] } = useApiQuery(
    { endpoint: "/attendance/list-admin", queryKey: ["attendance"] },
    { refetchOnWindowFocus: false }
  );

  const selectedEmployee = attendanceData.find((emp) => emp.emp_id === employeeId);

  const { present, absent } = useMemo(() => {
    if (!selectedEmployee) return { present: 0, absent: 0 };

    const filtered = selectedEmployee.attendances.filter((a) =>
      a.date.startsWith(month)
    );

    return filtered.reduce(
      (acc, curr) => {
        if (curr.status === "present") acc.present += 1;
        else if (curr.status === "absent") acc.absent += 1;
        return acc;
      },
      { present: 0, absent: 0 }
    );
  }, [selectedEmployee, month]);

  const chartData = [
    { name: "Present (Ate Meal)", value: present },
    { name: "Absent (Missed Meal)", value: absent },
  ];

  return (
    <Card className="w-full mx-auto">
      <h3 className="text-xl font-bold text-center text-gray-700 dark:text-white mb-4">
        Employee Meal Attendance
      </h3>

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
            contentStyle={{ backgroundColor: "#333", borderRadius: "8px", color: "#fff", border: "none" }}
            labelStyle={{ color: "#fff", fontWeight: "bold" }}
            itemStyle={{ color: "#fff" }}
          />
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
