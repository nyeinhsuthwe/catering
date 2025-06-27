import React, { useState, useMemo } from 'react';
import Datatable from 'react-data-table-component';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow, Pagination
} from 'flowbite-react';

const MealCheckoutDetails = ({ empId, onBack, data }) => {
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    checkOut: ''
  });

  if (!data) return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = useMemo(() => {
    const selectedEmployee = data.find(emp => emp.emp_id === empId);
    if (!selectedEmployee) return [];

    return selectedEmployee.attendances
      .filter((att) => {
        const matchStatus = filters.status ? att.status === filters.status : true;
        const matchDate = filters.date ? att.date === filters.date : true;
        const matchCheckOut =
          filters.checkOut !== ''
            ? att.check_out === (filters.checkOut === 'true')
            : true;
        return matchStatus && matchDate && matchCheckOut;
      })
      .map((att, idx) => ({
        id: idx + 1,
        emp_id: selectedEmployee.emp_id,
        emp_name: selectedEmployee.emp_name,
        emp_email: selectedEmployee.emp_email,
        total_amount: selectedEmployee.total_amount,
        ...att,
      }));
  }, [data, filters, empId]);


  //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    //Pagination
    const onPageChange = (page) => setCurrentPage(page);
    const totalItems = filteredData.length;
    const paginatedData = filteredData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        ← Back to List
      </button>

      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          name="status"
          className="border p-2 rounded"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
        <input
          type="date"
          name="date"
          className="border p-2 rounded w-full text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
          value={filters.date}
          onChange={handleChange}
        />
        <select
          name="checkOut"
          className="border p-2 rounded"
          value={filters.checkOut}
          onChange={handleChange}
        >
          <option value="">All Checkout</option>
          <option value="true">Checked Out</option>
          <option value="false">Not Checked Out</option>
        </select>
      </div>

    

      <div className="overflow-x-auto bg-white text-gray-700 dark:bg-gray-800 dark:text-white p-4 rounded">

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

        <Table striped>
          <TableHead>
            <TableHeadCell>No</TableHeadCell>
            <TableHeadCell>Emp ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Food</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Checkout </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {paginatedData.map((row, index) => (
              <TableRow key={row.emp_id} className="bg-white dark:border-gray-700 dark:bg-gray-800 border-0">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.emp_id}</TableCell>
                <TableCell>{row.emp_name}</TableCell>
                <TableCell>{row.emp_email}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.food_name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{String(row.check_out)}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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

      {filteredData.length > 0 && (
        <div className="mt-4 text-right font-semibold text-lg">
          Total Amount: {filteredData[0].total_amount} MMK
        </div>
      )}

    </div>
  );
};

export default MealCheckoutDetails;
