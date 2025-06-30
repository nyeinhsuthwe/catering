import { useApiQuery } from '../../hooks/useQuery'
import EmployeeMealAttendance from './EmployeeMealAttendance';
import ViewEmpOrderDetail from './ViewEmpOrderDetail';
import { useState } from 'react';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell, Pagination
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

  //pagination
    const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage] = useState(5);
  
     //Pagination
  const onPageChange = (page) => setCurrentPage(page);
  const totalItems = groupData.length;
  const paginatedData = groupData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  

  return (
    <div className="p-6  rounded-lg shadow-md text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
      {!showDetails ? (
        <>
          <h2 className="text-xl font-bold mb-4">Employee Reservations</h2>

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
