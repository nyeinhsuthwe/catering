import React from "react";
import { userStore } from "../../store/userStore";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useApiQuery } from "../../hooks/useQuery";
import dayjs from "dayjs";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdReceiptLong } from "react-icons/md";
import { useRef } from "react";
import html2pdf from "html2pdf.js";

export const Voucher = () => {
  const { user } = userStore();
  const voucherRef = useRef();

  const { data } = useApiQuery({
    endpoint: "/attendance/list",
    queryKey: ["invoice", user.employeeId],
    onError: (error) => {
      console.error("Error fetching invoice:", error);
    },
    onSuccess: (data) => {
      console.log("Invoice raw data:", data);
    },
  });

  const attendances = data?.attendances ?? [];
  const totalAmount = data?.total_amount ?? 0;
  const totalDays = attendances.length;
  const totalPresent = attendances.filter((a) => a.check_out).length;
  const totalAbsent = attendances.filter((a) => !a.check_out).length;
  // const today = dayjs();
  // const isLastDayOfMonth = today.date() === today.endOf("month").date();

  // if(!isLastDayOfMonth){
  //   return (
  //     <div className="max-w-5xl mx-auto mt-[80px] mb-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg items-center justify-center flex flex-col">
  //       <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">
  //         Voucher is available only on the end of the month.
  //       </h1>
  //       <p className="text-gray-600 dark:text-gray-300 mt-4">
  //         Please check back later.
  //       </p>
  //     </div>
  //   );

  // }

  // download function
  const downloadVoucherPDF = () => {
    const element = voucherRef.current;
    const opt = {
      margin: 0.5,
      filename: `voucher_${user.employeeId}_${dayjs().format("YYYYMM")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="mt-[80px] mb-[80px]">
      <div className="flex gap-3 max-w-5xl mx-auto">
        <h1 className="flex gap-2 text-3xl font-bold mb-4 dark:text-gray-300 text-gray-600">
          Voucher{" "}
          <MdReceiptLong className="dark:text-yellow-500 text-yellow-400 mt-1" />
        </h1>
        <div>
          <button
            className="bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400 border-0 w-40 h-10 rounded-md print:hidden"
            onClick={downloadVoucherPDF}
          >
            Download as PDF
          </button>
        </div>
      </div>

      <Card className="text-white max-w-5xl mx-auto" ref={voucherRef}>
        <div className="flex flex-col dark:text-gray-400 text-gray-600 mb-4">
          <p className="text-sm font-bold">
            Name : {data?.emp_name || user.name}
          </p>
          <hr className="my-2 border-t-2 dark:border-white border-gray-500 border-dashed w-[200px]" />
          <p className="text-sm font-bold">
            ID : {data?.emp_id || user.employeeId}
          </p>
          <hr className="my-2 border-t-2 dark:border-white border-gray-500 border-dashed w-[200px]" />
        </div>

        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell className="dark:bg-gray-500 bg-gray-300 dark:text-gray-100 text-gray-700">
                Date
              </TableHeadCell>
              <TableHeadCell className="dark:bg-gray-500 bg-gray-300 dark:text-gray-100 text-gray-700">
                Menu
              </TableHeadCell>
              <TableHeadCell className="dark:bg-gray-500 bg-gray-300 dark:text-gray-100 text-gray-700">
                Price
              </TableHeadCell>
              <TableHeadCell className="dark:bg-gray-500 bg-gray-300 dark:text-gray-100 text-gray-700">
                Check Out
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...attendances]
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="dark:bg-gray-600 bg-gray-200 font-bold dark:text-gray-100 text-gray-600">
                    {dayjs(item.date).format("D/M/YYYY")}
                  </TableCell>
                  <TableCell className="dark:bg-gray-600 bg-gray-200 font-bold dark:text-gray-100 text-gray-600">
                    {item.food_name}
                  </TableCell>
                  <TableCell className="dark:bg-gray-600 bg-gray-200 font-bold dark:text-gray-100 text-gray-600">
                    {parseFloat(item.price).toLocaleString()} Ks
                  </TableCell>
                  <TableCell className="dark:bg-gray-600 bg-gray-200 font-bold dark:text-gray-100 text-gray-600 flex items-center gap-2">
                    {item.check_out ? (
                      <>
                        present
                        <FaCheckCircle className="text-green-500" />
                      </>
                    ) : (
                      <>
                        absent
                        <FaTimesCircle className="text-red-500" />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <p className="text-sm text-yellow-500 font-bold mt-4">
          You ate our meal a total of {totalPresent}{" "}
          {totalPresent === 1 ? "day" : "days"} and were absent {totalAbsent}{" "}
          {totalAbsent === 1 ? "day" : "days"} this month.
        </p>

        <div className=" justify-items-end mt-4 text-gray-600 dark:text-gray-400">
          <p className="text-sm font-bold mt-4">
            Total Amount : {totalAmount.toLocaleString()} Ks
          </p>
          <hr className="my-2 border-t-2 dark:border-white border-gray-500 border-dashed w-[200px]" />
          <p className="text-sm font-bold">Total Days : {totalDays} Days</p>
          <hr className="my-2 border-t-2 dark:border-white border-gray-500 border-dashed w-[200px]" />
        </div>
      </Card>
    </div>
  );
};
