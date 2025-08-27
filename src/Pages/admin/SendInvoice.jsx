import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useApiQuery } from "../../hooks/useQuery";
import { useApiMutation } from "../../hooks/useMutation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
} from "flowbite-react";

const SendInvoice = () => {
  const { state } = useLocation(); // contains emp_id, emp_name, emp_email
  const [selectedMonth, setSelectedMonth] = useState("");
  const queryClient = useQueryClient();

  const { data: allOrders = [], isLoading } = useApiQuery(
    {
      endpoint: "/registered-orders/lists",
      queryKey: ["orders"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!state) {
    return (
      <p className="p-6">
        No invoice data provided. Please go back and select an invoice.
      </p>
    );
  }

  const filteredData = allOrders.filter(
    (order) =>
      order.emp_id === state.emp_id &&
      (!selectedMonth || order.date?.startsWith(selectedMonth)) // use 'date', not 'order_date'
  );

  const totalAmount = filteredData.reduce(
    (sum, order) => sum + parseFloat(order.price || 0),
    0
  ); // use 'price'

  const mutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice"] });
      toast.success("Invoice sent successfully!");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Sending Failed!";
      toast.error(errorMessage);
    },
  });

  const handleSendInvoice = async () => {
    if (!selectedMonth) {
      toast.error("Please select a month before sending the invoice.");
      return;
    }

    try {
      await mutation.mutateAsync({
        endpoint: `/send-invoice/${state.emp_id}`,
        method: "POST",
        body: {
          month: selectedMonth,
          total_amount: totalAmount,
          orders: filteredData,
        },
      });
    } catch (error) {
      console.error("Failed to send invoice:", error);
    }
  };

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
    <div className="p-6  rounded shadow text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-white">
        Invoice Details
      </h2>
      <p>
        <strong>Employee ID:</strong> {state.emp_id}
      </p>
      <p>
        <strong>Name:</strong> {state.emp_name}
      </p>
      <p>
        <strong>Email:</strong> {state.emp_email}
      </p>

      <div className="my-4">
        <label className="block text-sm font-medium mb-1">
          Filter by Month:
        </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">
        Orders for {selectedMonth || "All Months"}
      </h3>
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
      <Table striped hoverable>
        <TableHead>
          <TableHeadCell>No.</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Menu</TableHeadCell>
          <TableHeadCell>Price (MMK)</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Loading...
              </TableCell>
            </TableRow>
          ) : filteredData.length > 0 ? (
            paginatedData.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.food_name || "-"}</TableCell>
                <TableCell>
                  {parseFloat(order.price).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No data available
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

      <div className="mt-4 text-lg font-semibold">
        Total Amount: {totalAmount.toLocaleString()} MMK
      </div>

      <button
        className="mt-4 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 dark:bg-yellow-400 dark:hover:bg-yelow-500"
        onClick={handleSendInvoice}
      >
        Send Invoice
      </button>
    </div>
  );
};

export default SendInvoice;
