import React from "react";
import { useApiQuery } from "../../hooks/useQuery";
import MonthlyOrderTrend from "./MonthlyOrderTrendLineChart";
import MenuOrderBar from "./MenuOrderBar";
import RatingPieChart from "./RatingPieChart";
import EmployeeMealAttendance from "./EmployeeMealAttendance";
import MealAttendanceDonut from "./MealAttendanceDonut";

const Report = () => {
  const { data = [] } = useApiQuery({
    endpoint: "/registered-orders/lists",
    queryKey: ["orders"],
  });

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">
        Dashboard Reports
      </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
        <MenuOrderBar detailData={data} />
        <RatingPieChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <MealAttendanceDonut />
        <MonthlyOrderTrend />
      </div>


    </>
  );
};

export default Report;
