import React, { useState } from "react";
import { useApiQuery } from "../../hooks/useQuery";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";

const FeedbackTable = () => {
  const { data: feedbackData = [] } = useApiQuery(
    {
      endpoint: "/feedback/list",
      queryKey: ["feedback"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = feedbackData.length;
  const paginatedData = feedbackData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 rounded-lg shadow-md text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employee Feedback Records</h2>
        <Button className="bg-yellow-400 dark:bg-yellow-400 text-white hover:bg-yellow-500 dark:hover:bg-yellow-500" onClick={() => navigate("/")}>← Back to Chart</Button>
      </div>
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
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Employee Name</TableHeadCell>
          <TableHeadCell>Feedback</TableHeadCell>
          <TableHeadCell>Rating</TableHeadCell>
          <TableHeadCell>Date</TableHeadCell>
        </TableHead>
        <TableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.emp_id}</TableCell>
                <TableCell>{row.emp_name}</TableCell>
                <TableCell>{row.text}</TableCell>
                <TableCell>{row.rating}</TableCell>
                <TableCell>{row.updated_at}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-6">
                No feedback available
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
  );
};

export default FeedbackTable;
