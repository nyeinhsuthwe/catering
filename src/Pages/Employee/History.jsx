import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Card,
  Button,
} from "flowbite-react";
import React from "react";
import { useSelectedDatesStore } from "../../store/dateStore";
import { useApiMutation } from "../../hooks/useMutation";
import toast from "react-hot-toast";

const History = () => {
  const { selectedEvents, unselectEvents } = useSelectedDatesStore();
  const totalDay = selectedEvents.length;
  const totalAmount = selectedEvents.reduce(
    (sum, ev) => parseFloat(sum) + (parseFloat(ev.price) || 0),
    0
  );
  const handleCheckout = () => {
    const result = selectedEvents.map((event) => ({
      date: event.end,
    }));
    console.log("Checkout data:", result);

    checkoutMutation.mutate({
      endpoint: "registered-orders/store",
      method: "POST",
      body: result
    });
  };

  const checkoutMutation = useApiMutation({
    onSuccess: (data) => {
      console.log("Checkout successful:", data);
      toast.success("Checkout successful!");
    },
    onError: (error) => {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
    },
  });

  return (
    <div>
      <div className=" grid gap-4 mx-auto w-full pl-3">
        <Table striped>
          <TableHead className="text-gray-600">
            <TableRow>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Menu</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedEvents.map((data, index) => (
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
            ))}
          </TableBody>
        </Table>
        <Card className="bg-gray-100 text-center">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Days - {totalDay} Days
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Amount - {totalAmount} ks
          </p>
        </Card>
        <div className="flex gap-2 justify-center items-center">
          <Button color="yellow" onClick={unselectEvents}>
            Unselect All
          </Button>
          <Button
            className="bg-gray-400 hover:bg-gray-500"
            onClick={handleCheckout}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default History;
