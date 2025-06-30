import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Card,
  Button,
  Pagination,
} from "flowbite-react";
import React from "react";
import { useSelectedDatesStore } from "../../store/dateStore";
import { useApiMutation } from "../../hooks/useMutation";
import toast from "react-hot-toast";
import { userStore } from "../../store/userStore";
import { useState } from "react";

const History = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  const { selectedEvents, unselectEvents } = useSelectedDatesStore();
  const totalDay = selectedEvents.length;
  const totalAmount = selectedEvents.reduce(
    (sum, ev) => parseFloat(sum) + (parseFloat(ev.price) || 0),
    0
  );
  const { user } = userStore();
  console.log(user);

  const handleCheckout = () => {
    const formattedDates = selectedEvents.map((event) => {
      const dateObj = new Date(event.end);
      return `${dateObj.getFullYear()}-${
        dateObj.getMonth() + 1
      }-${dateObj.getDate()}`;
    });

    const payload = {
      date: formattedDates,
      emp_id: user.employeeId,
      total_day: totalDay,
      total_amount: totalAmount,
    };

    console.log("Checkout data:", payload);

    checkoutMutation.mutate({
      endpoint: "registered-orders/store",
      method: "POST",
      body: payload,
    });
  };

  const count = 5;
  const totalPages = Math.ceil(selectedEvents.length / count);
  const paginatedEvents = selectedEvents.slice(
    (currentPage - 1) * count,
    currentPage * count
  );

  const checkoutMutation = useApiMutation({
    onSuccess: (data) => {
      console.log("Checkout successful:", data);
      toast.success("Checkout successful!");
      unselectEvents();
    },
    onError: (error) => {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
    },
  });

  return (
    <div className="h-full grid gap-4">
     
        <div className="flex flex-col lg:flex-row gap-6 ">
          <div className="flex-1 overflow-auto rounded-lg">
            <Table striped>
              <TableHead className="text-gray-600">
                <TableRow>
                  <TableHeadCell>Date</TableHeadCell>
                  <TableHeadCell>Menu</TableHeadCell>
                  <TableHeadCell>Price</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedEvents.length > 0 ? (
                  paginatedEvents.map((data, index) => (
                    <TableRow
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {new Date(data.start).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>{data.title}</TableCell>
                      <TableCell>{data.price} ks</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <div className="flex flex-col items-center justify-center h-24">
                        <p className="text-gray-500">There is no records.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="mt-auto  w-full flex justify-end items-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <Card className="bg-gray-100 dark:bg-gray-800 text-center shadow">
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Total Days - {totalDay} Days
              </p>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Total Amount - {totalAmount} ks
              </p>
            </Card>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
                onClick={unselectEvents}
              >
                Unselect All
              </Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-600"
                onClick={handleCheckout}
              >
                Order
              </Button>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default History;
