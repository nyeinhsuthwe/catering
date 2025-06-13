// Report.jsx
import React from 'react';
import { useApiQuery } from '../../hooks/useQuery';
import MonthlyEmpOrderChart from './MonthlyEmpOrderChart';
import MenuOrderPie from './MenuOrderPie';

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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <MonthlyEmpOrderChart data={data} />
      {/* <MenuOrderPie data={data}/> */}
    </div>
  );
};

export default Report;
