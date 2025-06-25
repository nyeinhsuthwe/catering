import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell
} from 'flowbite-react';
// import MenuOrderPie from './MenuOrderPie'; // Uncomment if needed

const ViewEmpOrderDetail = ({ data, empId, onBack }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  // Filter employee orders
  const empOrders = data.filter(d => d.emp_id === empId);

  const detailData = selectedMonth
    ? empOrders.filter(order => {
      const orderDate = new Date(order.date);
      const month = String(orderDate.getMonth() + 1).padStart(2, '0');
      const year = orderDate.getFullYear();
      return `${year}-${month}` === selectedMonth;
    })
    : empOrders;

  const totalAmount = detailData.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  return (
    <div className="mt-6">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">
        ← Back to List
      </button>

      <h2 className="text-xl font-semibold mb-4">
        Details for Employee ID: {empId}
      </h2>

      {/* Month Filter */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Filter by Month</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <Table striped hoverable>
          <TableHead className="bg-gray-100 text-sm">
            <TableHeadCell>No.</TableHeadCell>
            <TableHeadCell>Employee ID</TableHeadCell>
            <TableHeadCell>Employee Name</TableHeadCell>
            <TableHeadCell>Food Name</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Order Date</TableHeadCell>
          </TableHead>
          <TableBody>
            {detailData.length > 0 ? (
              detailData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.emp_id}</TableCell>
                  <TableCell>{row.emp_name}</TableCell>
                  <TableCell>{row.food_name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                  No order records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-right font-semibold text-lg">
        Total Amount: <span className="text-green-600">{totalAmount}</span>
      </div>

      {/* Optional: Add pie chart */}
      {/* <MenuOrderPie detailData={detailData} /> */}
    </div>
  );
};

export default ViewEmpOrderDetail;
