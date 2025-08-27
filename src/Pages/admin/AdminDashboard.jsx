import React from 'react';
import { useApiQuery } from '../../hooks/useQuery'; 
import DataTable from 'react-data-table-component'; 
import { DarkThemeToggle } from 'flowbite-react';
import MonthlyEmpOrderChart from './MonthlyEmpOrderChart'; 
import MenuOrderPie from './MenuOrderPie';
import MealAttendanceDonut from './MealAttendanceDonut';
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
    <>
      {/* KPIs Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="p-4 rounded-lg shadow text-white dark:bg-gray-800 bg-white dark:text-white">
          <div className="flex items-center mb-1">
            <i class="fa-solid fa-utensils  text-blue-600 mr-2"></i>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Menus
            </h2>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
            {stats.menus_count ?? 0}
          </p>
        </div>
        <div className="p-4  rounded-lg shadow text-white dark:bg-gray-800 bg-cyan-100 dark:text-white">
          <div className="flex items-center mb-1">
            <i className="fas fa-calendar-alt text-cyan-600 mr-2"></i>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Monthly Orders
            </h2>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
            {stats.monthly_orders ?? 0}
          </p>
        </div>

        <div className="p-4  rounded-lg shadow text-white dark:bg-gray-800 bg-green-100 dark:text-white">
          <div className="flex items-center mb-1">
            <i className="fas fa-shopping-cart text-green-600 mr-2"></i>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Total Orders</h2>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
            {stats.total_orders ?? 0}
          </p>
        </div>
        <div className="p-4  rounded-lg shadow text-gray-800 bg-yellow-100 dark:bg-gray-800 dark:text-white">

          <div className="flex items-center mb-1">
            <i class="fa-regular fa-user text-yellow-600 mr-2"></i>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Total Registrations
            </h2>
          </div>

          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
            {stats.total_employees ?? 0}
          </p>
        </div>
      </div>

            <MonthlyEmpOrderChart data={data} />
      <div className="flex flex-wrap gap-4 w-full mb-4">
        <div className="p-4 rounded-lg shadow mb-6 w-[480px] text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Recent Orders</h2>
          <ul className="divide-y">
            {data?.slice(0, 5).map((order, idx) => (
              <li key={idx} className="py-2 flex justify-between text-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 dark:text-white">{order.emp_name}</span>
                  <span className="text-gray-500">{order.food_name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-medium text-gray-700 dark:text-white">{order.date}</span>
                  <span className="text-gray-500">{order.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-lg shadow mb-6 w-[480px] text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Upcoming Events</h2>
          <ul className="space-y-2 text-sm">
            {announcement?.map((announcement, idx) => (
              <li key={idx} className="py-2 flex flex-col text-sm">
                <span className="text-gray-500 mb-1">{announcement.date}</span>
                <span className="font-semibold text-gray-700 dark:text-white">{announcement.title}</span>
                <span className="text-gray-600 dark:text-gray-300">{announcement.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>






    </>
  );
};

export default AdminDashboard;


