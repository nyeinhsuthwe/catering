import React from 'react'
import Datatable from 'react-data-table-component'
import { useApiQuery } from '../../hooks/useQuery'
import EmployeeMealAttendance from './EmployeeMealAttendance';
import ViewEmpOrderDetail from './ViewEmpOrderDetail';
import { useState } from 'react';

const Reservation = () => {
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

  // Get unique employees (one row per emp_id)
  const groupData = Array.from(
    new Map(data.map(item => [item.emp_id, item])).values()
  );
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const columns = [
    {
      name: 'No.',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Employee ID',
      selector: row => row.emp_id,
      sortable: true,
    },
    {
      name: 'Employee Name',
      selector: row => row.emp_name,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <button
          onClick={() => {
            setSelectedEmpId(row.emp_id);
            setShowDetails(true);
          }}
          className="text-blue-600 hover:underline"
        >
          View Details
        </button>
      ),
    }
  ];






  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* <div className="mb-4">
        <div className="flex items-center mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search name..."
              required
            />
          </div>
        </div>
      </div> */}
      {!showDetails ? (
      <Datatable
        title="Employee Reservations"
        columns={columns}
        data={groupData} // <-- this line is crucial
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20, 25]}
      />
      ): (
        <ViewEmpOrderDetail
        empId={selectedEmpId}
          data={data}
          onBack={() => setShowDetails(false)}
        />
        
      )}
  
      {!showDetails && <EmployeeMealAttendance />}
    </div>
  );
};

export default Reservation;
