import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Card,
  Button
} from "flowbite-react";
import React from "react";
import { useSelectedDatesStore } from "../../store/dateStore";

const History = () => {
  const { selectedEvents , unselectEvents } = useSelectedDatesStore();

  const totalAmount = selectedEvents.reduce((sum, ev) => sum + (ev.price || 0), 0);

  const handleCheckout = () => {
    const result = selectedEvents.map((event) => ({
      id: event.id,
      menu: event.menu,
      price: event.price,
      date: event.start.toISOString().split("T")[0],
    }));

    console.log("Checkout data:", result);
    alert("Checkout data logged in console");
  };

  return (
   <div>
     <div className="mt-7 grid gap-4 mx-auto w-full p-5">
      
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
              <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {new Date(data.start).toLocaleDateString()}
                </TableCell>
                <TableCell>{data.menu}</TableCell>
                <TableCell>{data.price} ks</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Card className="bg-gray-100 text-center">
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Days - {selectedEvents.length} Days
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Total Amount - {totalAmount} ks
          </p>
        </Card>
         <div className="flex gap-2 justify-center items-center">
          <Button color="yellow" onClick={unselectEvents}>Unselect All</Button>
          <Button className="bg-gray-400 hover:bg-gray-500" onClick={handleCheckout}>Check out</Button>
         </div>
      </div>
      </div>

  
  );
};

export default History;
