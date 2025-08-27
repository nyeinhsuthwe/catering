// Report.jsx
import React from "react";
import { useApiQuery } from "../../hooks/useQuery";
import MonthlyEmpOrderChart from "./MonthlyEmpOrderChart";
import { useState } from "react";
import MealAttendanceDonut from "./MealAttendanceDonut";
import RatingPieChart from "./RatingPieChart";
import MenuOrderBar from "./MenuOrderBar";
import MonthlyOrderTrend from "./MonthlyOrderTrendLineChart";

const Report = () => {
  const { data = [] } = useApiQuery({
    endpoint: "/registered-orders/lists",
    queryKey: ["orders"],
  });

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

  const { data: feedbackData = [] } = useApiQuery(
    {
      endpoint: "/feedback/list",
      queryKey: ["feedback"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: attendanceData = [] } = useApiQuery(
    { endpoint: "/attendance/list-admin", queryKey: ["attendance"] },
    { refetchOnWindowFocus: false }
  );

  // Get employee options and months
  // Employee options (with "All Employees" at the top)
  const employeeOptions = [
    { name: "All Employees", id: "all" },
    ...attendanceData.map((emp) => ({
      name: emp.emp_name,
      id: emp.emp_id,
    })),
  ];
  const allDates = attendanceData.flatMap((emp) =>
    emp.attendances.map((a) => a.date.slice(0, 7))
  );
  const uniqueMonths = [...new Set(allDates)];

  // Global filter states
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(uniqueMonths[0] || "");

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">
        Employee Reports
      </h2>

      {/* <MonthlyEmpOrderChart data={data} /> */}

      <div className="mb-6 flex flex-wrap gap-4 items-center ">
        <select
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="border rounded px-8 py-2 text-gray-800 dark:text-white dark:bg-gray-800 bg-white"
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
          className="border px-3 py-2 rounded text-gray-800 dark:text-white dark:bg-gray-800 bg-white"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <MealAttendanceDonut
          employeeId={selectedEmployeeId}
          month={selectedMonth}
        />
        {/* <RatingPieChart /> */}
        <MonthlyOrderTrend/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <MenuOrderBar detailData={data} />

        
         <RatingPieChart />

      </div>
      {/* <MenuOrderPie detailData={filteredData} /> */}
    </>
  );
};

export default Report;
