import React, { useState } from 'react';
import { useApiQuery } from "../../hooks/useQuery";
import Datatable from 'react-data-table-component';
import MealCheckoutDetails from './MealCheckoutDetails'; // Adjust path if needed

const EmployeeMealAttendance = () => {
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const { data } = useApiQuery(
    {
      endpoint: "/attendance/list-admin",
      queryKey: ["attendance"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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
    <div className="p-4">
      {!showDetails ? (
        <Datatable
          title="Employee Attendance"
          columns={columns}
          data={data || []}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 15, 20, 25]}
        />
      ) : (
        <MealCheckoutDetails
          empId={selectedEmpId}
          data={data}
          onBack={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default EmployeeMealAttendance;
