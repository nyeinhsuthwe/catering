import React, { useState } from 'react';
import { useApiQuery } from "../../hooks/useQuery";

import MealCheckoutDetails from './MealCheckoutDetails'; 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow, Pagination
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

  
  const hasData = Array.isArray(data) && data.length > 0;

  const displayData = hasData
    ? data
    : [
      {
        emp_id: '',
        emp_name: '',
      },
    ];

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  //Pagination
  const onPageChange = (page) => setCurrentPage(page);
  const totalItems = displayData.length;
  const paginatedData = displayData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    //  <div className="p-4 rounded-md shadow">
    <div>
      {!showDetails ? (
        <>
          <h2 className="text-lg font-semibold mb-4 mt-3">Employee Attendance</h2>
          <div className="overflow-x-auto">
            <div className="flex justify-end items-center mb-4">
            <label className="mr-2 font-medium text-sm dark:text-white text-gray-700">
              Items per page:
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // reset to first page when limit changes
              }}
              className="border border-gray-300 rounded p-2 text-sm dark:bg-gray-800 bg-white dark:text-white text-gray-800"
            >
              {[1, 5, 10, 15, 20, 30].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
            <Table hoverable striped>
              <TableHead className="bg-gray-100">
                <TableHeadCell>No.</TableHeadCell>
                <TableHeadCell>Employee ID</TableHeadCell>
                <TableHeadCell>Employee Name</TableHeadCell>
                <TableHeadCell>Actions</TableHeadCell>
              </TableHead>
              <TableBody>
                {hasData ? (
                  paginatedData.map((row, index) => (
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
                          className="text-yellow-400 hover:underline"
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
            {totalItems > itemsPerPage && (
              <div className="flex overflow-x-auto justify-center mt-4">
                <Pagination
                  layout="table"
                  currentPage={currentPage}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={onPageChange}
                  showIcons
                />
              </div>
            )}
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
