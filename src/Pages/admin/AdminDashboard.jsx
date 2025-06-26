import React from 'react';
import { useApiQuery } from '../../hooks/useQuery'; // your custom hook
import DataTable from 'react-data-table-component'; // assuming you are using react-data-table-component for the table
import { DarkThemeToggle } from 'flowbite-react';
import MonthlyEmpOrderChart from './MonthlyEmpOrderChart'; // your chart component
import MenuOrderPie from './MenuOrderPie';
import Report from './Report';
const AdminDashboard = () => {



  const { data: announcement } = useApiQuery(
    {
      endpoint: "/announcement/list",
      queryKey: ["announcement"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data = [] } = useApiQuery(
    {
      endpoint: "/registered-orders/lists",
      queryKey: ["orders"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log("Fetched Data:", data);



  const { data: stats = {} } = useApiQuery(
    {
      endpoint: "/dashboard/stats",
      queryKey: ["dashboard-stats"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log("Fetched Stats:", stats);


  return (
    <div className="">



      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <div className="flex items-center mb-1">
            <i class="fa-solid fa-utensils  text-blue-600 mr-2"></i>
            <h2 className="text-lg font-semibold text-gray-800">
              Menu
            </h2>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {stats.menus_count ?? 0}
          </p>
        </div>
        <div className="p-4 bg-cyan-100 rounded-lg shadow">
          <div className="flex items-center mb-1">
            <i className="fas fa-calendar-alt text-cyan-600 mr-2"></i>
            <h2 className="text-lg font-semibold text-gray-800">
              Monthly Orders
            </h2>
          </div>
          <p className="text-2xl font-bold text-cyan-600 mt-2">
            {stats.monthly_orders ?? 0}
          </p>
        </div>

        <div className="p-4 bg-green-100 rounded-lg shadow">
          <div className="flex items-center mb-1">
            <i className="fas fa-shopping-cart text-green-600 mr-2"></i>
            <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {stats.total_orders ?? 0}
          </p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow">

          <div className="flex items-center mb-1">
            <i class="fa-regular fa-user text-yellow-600 mr-2"></i>
            <h2 className="text-lg font-semibold text-gray-800">
              Total Registrations
            </h2>
          </div>

          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {stats.total_employees ?? 0}
          </p>
        </div>
      </div>


      <div className='w-full mb-4'>
        <Report />
      </div>
      <div className="flex  flex-wrap gap-4 w-full mb-4">

         <div className="p-4  rounded-lg shadow mb-6 w-[400px] text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Recent Orders</h2>
          <ul className="divide-y ">
            {data?.slice(0, 5).map((order, idx) => (
              <li key={idx} className="py-2 flex justify-between text-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 dark:text-white">{order.emp_name}</span>
                  <span className="text-gray-500">{order.food_name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 dark:text-white">{order.date}</span>
                  <span className='text-gray-500'>{order.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-lg shadow mb-6 w-[550px] text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Upcoming Events</h2>
          <ul className="space-y-2 text-sm">
            {announcement?.map((announcement, idx) => (
              <li key={idx} className='py-2 flex justify-between text-sm'>
                <div className="flex flex-col ">
                <span>{announcement.date}  </span> 
                
                </div>
                <div className="flex flex-col ">
                <span className="">{announcement.title}</span>
                <span className="">{announcement.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

       

      </div>

      {/* <MenuOrderPie data={data}/> */}






    </div>
  );
};

export default AdminDashboard;


