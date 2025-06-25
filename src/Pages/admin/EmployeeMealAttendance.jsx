import React, { useState } from 'react';
import { useApiQuery } from "../../hooks/useQuery";

import MealCheckoutDetails from './MealCheckoutDetails'; // Adjust path if needed
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
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
  const hasData = Array.isArray(data) && data.length > 0;

  const displayData = hasData
    ? data
    : [
      {
        emp_id: '',
        emp_name: '',
      },
    ];


  return (
    //  <div className="p-4 rounded-md shadow">
    <div>
      {!showDetails ? (
        <>
          <h2 className="text-lg font-semibold mb-4">Employee Attendance</h2>
          <div className="overflow-x-auto">
            <Table hoverable striped>
              <TableHead className="bg-gray-100">
                <TableHeadCell>No.</TableHeadCell>
                <TableHeadCell>Employee ID</TableHeadCell>
                <TableHeadCell>Employee Name</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableHead>
              <TableBody>
                {hasData ? (
                  displayData.map((row, index) => (
                    <TableRow key={row.emp_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.emp_id}</TableCell>
                      <TableCell>{row.emp_name}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => {
                            setSelectedEmpId(row.emp_id);
                            setShowDetails(true);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          View Details
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                      No attendance records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
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
