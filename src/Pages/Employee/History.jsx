import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Card,
} from "flowbite-react";
import React from "react";

const History = () => {
  return (
    <div className="mt-7 row grid mx-auto w-full  p-5">
      <Table striped className="col-10">
        <TableHead className="text-gray-600">
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>Menu</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
        </TableHead>

        <TableBody>
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap  font-medium text-gray-900 dark:text-white">
              15,5,2025
            </TableCell>
            <TableCell className="">Chicken</TableCell>
            <TableCell className="">2000Ks</TableCell>
          </TableRow>  
        </TableBody>
      </Table>

      <div className="col-2">
        <Card  className="max-w-sm  ms-3 bg-gray-100">
      <h5 className="text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
        Your Booking List
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Total Days - 15 Days
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Total Amount - 20000ks
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Status - Completed
      </p>
    </Card>
      </div>
    
    </div>
  );
};

export default History;
