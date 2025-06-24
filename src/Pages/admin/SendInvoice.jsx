// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeadCell,
//   TableRow,
// } from "flowbite-react";
// import { useApiQuery } from "../../hooks/useQuery";
// import { useApiMutation } from "../../hooks/useMutation";
// import { userStore } from "../../store/userStore";
// import { totalAmountStore } from "../../store/totalAmount";
// import { toast } from "react-hot-toast";

//   const { totalAmount, totalOrders } = totalAmountStore();
//   const { user } = userStore();

//   console.log(totalAmount, totalOrders)

//   const sendEmailMutation = useApiMutation({
//     onSuccess: () => toast.success("Email sent!"),
//     onError: (err) => toast.error("Failed to send email"),
//   });
// totalOrders
//   const handleSendEmail = () => {
//     const message = `
// Hello ${user.name},

// Here is your catering summary for this month:

// - Total Orders: ${totalOrders}
// - Total Amount: ${totalAmount.toLocaleString()} Ks

// Thank you for using our service!
//     `;

//     sendEmailMutation.mutate({
//       endpoint: /send-invoice/${user.employeeId},
//       method: "POST",
//       body: { email: user.email, subject: "Monthly Catering Summary", message },
//     });
//   };

//   return (
//     <div className="overflow-x-auto mt-6">
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableHeadCell>name</TableHeadCell>
//             <TableHeadCell>Total Order</TableHeadCell>
//             <TableHeadCell>Total Amount</TableHeadCell>
//             <TableHeadCell></TableHeadCell>
//           </TableRow>
//         </TableHead>
//         <TableBody className="divide-y">
//           <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
//             <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//               {user.name}
//             </TableCell>
//             <TableCell>{totalOrders}</TableCell>
//             <TableCell>{totalAmount.toLocaleString()} ks</TableCell>
//             <TableCell>
//               <button
//                 onClick={handleSendEmail}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Send Email
//               </button>
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default MailTesting;