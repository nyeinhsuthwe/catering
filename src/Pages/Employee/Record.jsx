import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Card,
  Spinner,
  Button,
  Pagination,
} from "flowbite-react";
import { useApiQuery } from "../../hooks/useQuery";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { userStore } from "../../store/userStore";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const Record = () => {
  const { user } = userStore();

  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState({
    year: now.year(),
    month: now.month() + 1,
  });

  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate]);

  const { data, isLoading } = useApiQuery({
    endpoint: "/get-orders",
    params: { year: selectedDate.year, month: selectedDate.month },
    queryKey: ["records", selectedDate.year, selectedDate.month],
  });

  console.log(data);

  const checkoutMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkout"] });
      toast.success("Your checkout is successful!");
    },
    onError: (error) => {
      console.error(
        "Checkout failed:",
        error?.response?.data?.message || error.message
      );
    },
  });

  const handleCheckout = (recordDate) => {
    checkoutMutation.mutate({
      endpoint: "/attendance",
      method: "POST",
      body: {
        emp_id: user.employeeId,
        date: dayjs(recordDate).format("YYYY-MM-DD"),
        status: "present",
        "check-out": true,
      },
    });
  };

  const records = data ?? [];
  const count = 6;
  const paginatedRecord = records.slice(
    (currentPage - 1) * count,
    currentPage * count
  );
  const totalPages = Math.ceil(records.length / count);
  const totalAmount = records.reduce((sum, record) => {
    const price = parseFloat(record.food_month_prices_by_date[0]?.price || 0);
    return sum + price;
  }, 0);
  const handlePrevious = () => {
    const newDate = dayjs(
      `${selectedDate.year}-${selectedDate.month}-01`
    ).subtract(1, "month");
    setSelectedDate({ year: newDate.year(), month: newDate.month() + 1 });
  };

  const handleCurrent = () => {
    setSelectedDate({ year: now.year(), month: now.month() + 1 });
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] overflow-y-scroll py-6 pr-11 flex flex-col items-center">
      <div className="grid gap-4 mx-auto w-full pl-3">
        <div className="flex gap-4 justify-start items-center mb-4">
          <Button color="gray" onClick={handlePrevious}>
            Previous
          </Button>
          <Button color="gray" onClick={handleCurrent}>
            Current
          </Button>
          <span className="text-sm text-gray-600">
            Showing:{" "}
            {dayjs(`${selectedDate.year}-${selectedDate.month}-01`).format(
              "MMMM YYYY"
            )}
          </span>
        </div>

        <Table striped>
          <TableHead className="text-gray-600">
            <TableRow>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Menu</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
              <TableHeadCell>Check Out</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length > 0 ? (
              paginatedRecord.map((record) => (
                <TableRow key={record.id} className="hover:bg-gray-50">
                  <TableCell>
                    {dayjs(record.date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {record.food_month_prices_by_date[0]?.food_name || "NA"}
                  </TableCell>
                  <TableCell>
                    {record.food_month_prices_by_date[0]?.price || "NA"} Ks
                  </TableCell>
                  <TableCell>
                    {dayjs(record.date).isSame(dayjs(), "day") ? (
                      dayjs().hour() === 11 ? (
                        <Button
                          className="w-8 h-8"
                          onClick={() => handleCheckout(record.date)}
                          disabled={record.checked_out}
                          color={record.checked_out ? "success" : "blue"}
                        >
                          <i className="fa-solid fa-check text-center flex items-center justify-center"></i>
                        </Button>
                      ) : (
                        <span className="text-sm text-gray-500">
                          It is available between 11am–12pm
                        </span>
                      )
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No records found for this month.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex justify-center items-center mt-4">
          <Card className="bg-gray-100 text-center max-w-md w-full">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Total Days - {records.length} Days
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Total Amount - {totalAmount.toLocaleString()} ks
            </p>
          </Card>
          <div className="flex overflow-x-auto justify-end w-[67%] mt-auto">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
