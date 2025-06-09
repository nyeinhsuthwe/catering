import React from 'react';
import { useApiQuery } from '../../hooks/useQuery'; // your custom hook
import DataTable from 'react-data-table-component'; // assuming you are using react-data-table-component for the table
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

   const { data =[]} = useApiQuery(
     {
       endpoint: "/registered-orders/lists",
       queryKey: ["orders"],
     },
     {
       refetchOnWindowFocus: false,
     }
   );
   console.log("Fetched Data:", data);
 
  const { data: feedbackData } = useApiQuery(
    {
      endpoint: "/feedback/list",
      queryKey: ["feedback"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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
    <div className="p-6 bg-white rounded-lg shadow-md">
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">
            Monthly Reservations
          </h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {stats.monthly_orders ?? 0}
          </p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {stats.total_orders ?? 0}
          </p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">
            Total Registrations
          </h2>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {stats.total_employees ?? 0}
          </p>
        </div>
      </div>


      

      <div className="p-4 bg-gray-200 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Upcoming Events</h2>
        <ul className="space-y-2 text-sm">
          {announcement?.map((announcement, idx) => (
            <li key={idx}>
              <strong>{announcement.text}</strong> — {announcement.date}
            </li>
          ))}
        </ul>
      </div>

     <div className="p-4 bg-gray-200 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Orders</h2>
        <ul className="divide-y divide-gray-200">
          {data?.slice(0, 5).map((order, idx) => (
            <li key={idx} className="py-2 flex justify-between text-sm">
              <span>{order.emp_name}</span>
              <span>{order.date}</span>
            </li>
          ))}
        </ul>
      </div>

      <DataTable
        title="Employee Feedback"
        columns={[
          { name: "ID", selector: (row) => row.emp_id, sortable: true },
          { name: "Employee Name", selector: (row) => row.emp_name, sortable: true },
          { name: "Feedback", selector: (row) => row.text },
          { name: "Rating", selector: (row) => row.rating, sortable: true },
          { name: "Date", selector: (row) => row.updated_at, sortable: true }
        ]}
        data={feedbackData || []}
        pagination
        highlightOnHover
        striped
        noDataComponent="No feedback available"
      />



    </div>
  );
};

export default AdminDashboard;


