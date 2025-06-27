// Report.jsx
import React from 'react';
import { useApiQuery } from '../../hooks/useQuery';
import MonthlyEmpOrderChart from './MonthlyEmpOrderChart';
import FeedbackRecord from './FeedbackRecord';
import MenuOrderPie from './MenuOrderPie';
import { useState } from 'react';
import MealAttendanceDonut from './MealAttendanceDonut';
import RatingPieChart from './RatingPieChart';

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

  return (

    <>

      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Employee Reports</h2>

      
      

        <MonthlyEmpOrderChart data={data} />

       
      {/* <MealAttendanceDonut/> */}
       {/* <RatingPieChart feedbackData={feedbackData} /> */}
      <FeedbackRecord />
                {/* <MenuOrderPie detailData={filteredData} /> */}
               

    </>
  );
};

export default Report;
