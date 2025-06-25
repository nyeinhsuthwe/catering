import React from 'react'
import Datatable from 'react-data-table-component'
import { useApiQuery } from '../../hooks/useQuery'
import EmployeeMealAttendance from './EmployeeMealAttendance';
import ViewEmpOrderDetail from './ViewEmpOrderDetail';
import { useState } from 'react';
import { useApiMutation } from '../../hooks/useMutation';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";


const Reservation = () => {
  const { data = [] } = useApiQuery(
    {
      endpoint: "/registered-orders/lists",
      queryKey: ["orders"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log("Employee Order Data:", data);


  // Get unique employees (one row per emp_id)
  const groupData = Array.from(
    new Map(data.map(item => [item.emp_id, item])).values()
  );
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);






  return (
    <div className="p-6  rounded-lg shadow-md text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
      {!showDetails ? (
        <>
          <h2 className="text-xl font-bold mb-4">Employee Reservations</h2>

          <Table hoverable striped>
            <TableHead>
              <TableHeadCell>No.</TableHeadCell>
              <TableHeadCell>Employee ID</TableHeadCell>
              <TableHeadCell>Employee Name</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody>
              {groupData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="4" className="text-center py-6 text-gray-500">
                    No reservation records found.
                  </TableCell>
                </TableRow>
              ) : (
                groupData.map((row, index) => (
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
                        className="text-yellow-500 hover:underline"
                      >
                        View Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>



          <EmployeeMealAttendance />
        </>
      ) : (
        <ViewEmpOrderDetail
          empId={selectedEmpId}
          data={data}
          onBack={() => setShowDetails(false)}
        />
      )}
    </div>
  );
};

export default Reservation;
