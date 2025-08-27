import React, { useState } from 'react';
import { useApiQuery } from '../../hooks/useQuery';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Spinner, Pagination
} from 'flowbite-react';

const InvoiceInfo = () => {
  const [filterName, setFilterName] = useState("");


  const { data: invoiceData = [], isLoading } = useApiQuery(
    {
      endpoint: "/invoices",
      queryKey: ["invoice"],
      method: "GET",
      onError: (error) => {
        console.error("Error fetching invoices:", error);
      },
    },
    {
      refetchOnWindowFocus: false,
    }
  );


  const groupData = Array.from(
    new Map(invoiceData.map(item => [item.emp_id, item])).values()
  );

  const filteredData = groupData.filter(item =>
    item.emp_name?.toLowerCase().includes(filterName.toLowerCase())
  );


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

    <div className="p-6 rounded-lg shadow-md text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Employee Invoices</h2>

      <div className="w-full md:w-1/3 mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
          Filter by Name
        </label>
        <input
          type="text"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Enter name..."
          className="p-2 border border-gray-300 rounded w-full text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
        />
      </div>

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
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner size="lg" />
          </div>
        ) : (
          <Table hoverable striped>
            <TableHead className="bg-gray-100 text-sm">
              <TableHeadCell>No.</TableHeadCell>
              <TableHeadCell>Employee ID</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <TableRow key={row.emp_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.emp_id || '-'}</TableCell>
                    <TableCell>{row.emp_name || '-'}</TableCell>
                    <TableCell>
                      <Link
                        to="/admin/invoiceInfo/sendInvoice"
                        state={{
                          emp_id: row.emp_id,
                          emp_name: row.emp_name,
                          emp_email: row.emp_email,
                        }}
                      >
                        <button className="text-yellow-500 hover:underline">
                          View Details
                        </button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    No matching records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
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
    </div>

  );
};

export default InvoiceInfo;
