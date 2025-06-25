import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useApiQuery } from '../../hooks/useQuery';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Spinner,
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


    // const columns = [
    //     {
    //         name: 'No.',
    //         selector: (row, index) => index + 1,
    //         width: '60px',
    //     },
    //     {
    //         name: 'Employee ID',
    //         selector: row => row.emp_id || '-',
    //         sortable: true,
    //     },
    //     {
    //         name: 'Name',
    //         selector: row => row.emp_name || '-',
    //         sortable: true,
    //     },
    //     {
    //         name: 'Action',
    //         cell: row => (
    //             <Link to="/admin/invoiceInfo/sendInvoice"
    //                 state={{
    //                     emp_id: row.emp_id,
    //                     emp_name: row.emp_name,
    //                     emp_email: row.emp_email,
    //                 }}
    //             >
    //                 <button
    //                     className="text-yellow-400 hover:underline"

    //                 >
    //                     View Details
    //                 </button>
    //             </Link>
    //         ),
    //     },
    // ];

    const groupData = Array.from(
        new Map(invoiceData.map(item => [item.emp_id, item])).values()
    );

    const filteredData = groupData.filter(item =>
        item.emp_name?.toLowerCase().includes(filterName.toLowerCase())
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
                filteredData.map((row, index) => (
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
      </div>
    </div>
            
       
    );
};

export default InvoiceInfo;
