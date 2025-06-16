// Report.jsx
import React from 'react';
import { useApiQuery } from '../../hooks/useQuery';
import MonthlyEmpOrderChart from './MonthlyEmpOrderChart';
import FeedbackRecord from './FeedbackRecord';

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
    
      <>
      <h2 className="text-xl font-semibold mb-4">Employee Reports</h2>
      
    <div className='flex flex-wrap gap-4'>
      <div className="flex flex-wrap gap-4">
      <MonthlyEmpOrderChart data={data} />
      
      {/* <MenuOrderPie data={data}/> */}
       </div>
    </div>
    <FeedbackRecord  />
    </>
  );
};

export default Report;
