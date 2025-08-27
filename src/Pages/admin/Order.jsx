// // import React from "react";
// // import { Link, NavLink } from "react-router-dom";
// // import {
// //   Sidebar,
// //   SidebarItem,
// //   SidebarItemGroup,
// //   SidebarItems,
// // } from "flowbite-react";
// // import { announcementStore } from "../../store/announcement";

// // const SideBar = () => {
// //   const { announcements, loading } = announcementStore();

// //   return (
// //     <div className="bg-gray-100 dark:bg-black fixed h-screen z-[10]">
// //       <Sidebar
// //         aria-label="Default sidebar example"
// //         className="z-[100] [&>div]:rounded-none"
// //       >
// //         <SidebarItems>
// //           <SidebarItemGroup>
// //             <NavLink
// //               to="profile"
// //               children={({ isActive }) => (
// //                 <SidebarItem
// //                   className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
// //                 >
// //                   <i className="fa-solid fa-user me-3"></i>
// //                   Profile
// //                 </SidebarItem>
// //               )}
// //             />
// //             <hr className="text-gray-300" />

// //             <NavLink
// //               to="password"
// //               children={({ isActive }) => (
// //                 <SidebarItem
// //                   className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
// //                 >
// //                   <i className="fa-solid fa-unlock me-3"></i>
// //                   Change Password
// //                 </SidebarItem>
// //               )}
// //             />
// //             <hr className="text-gray-300" />

// //             <NavLink
// //               to="/employee"
// //               end
// //               children={({ isActive }) => (
// //                 <SidebarItem
// //                   className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
// //                 >
// //                   <i className="fa-solid fa-clock me-3"></i>
// //                   Dashboard
// //                 </SidebarItem>
// //               )}
// //             />
// //             <hr className="text-gray-300" />

// //             <NavLink
// //               to="feedback"
// //               children={({ isActive }) => (
// //                 <SidebarItem
// //                   className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
// //                 >
// //                   <i className="fa-solid fa-comment me-3"></i>
// //                   Feedback
// //                 </SidebarItem>
// //               )}
// //             />
// //             <hr className="text-gray-300" />

// //             <NavLink
// //               to="record"
// //               children={({ isActive }) => (
// //                 <SidebarItem
// //                   className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
// //                 >
// //                   <i className="fa-solid fa-clock-rotate-left me-3"></i>
// //                   Recorded
// //                 </SidebarItem>
// //               )}
// //             />
// //             <hr className="text-gray-300" />

// //             <NavLink
// //               to="announcement"
// //               children={({ isActive }) => (
// //                 <div className="relative">
// //                   <SidebarItem
// //                     className={isActive ? "text-yellow-400 dark:text-yellow-500 font-bold" : "text-gray-500 dark:text-gray-400"}
// //                   >
// //                     <i className="fa-solid fa-bullhorn me-3"></i>
// //                     Announcement
// //                   </SidebarItem>
// //                   {!loading && announcements.length > 0 && (
// //                     <div className="bg-red-500 rounded-full flex items-center justify-center w-4 text-white h-4 absolute top-[12px] right-[40px] text-xs">
// //                       {announcements.length}
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             />
// //             <hr className="text-gray-300" />


// // <NavLink
// //               to="voucher"
// //               children={({ isActive }) => (
// //                 <SidebarItem
// //                   className={isActive ? "text-yellow-400 dark:text-yellow-500  font-bold" : "text-gray-500 dark:text-gray-400"}
// //                 >
// //                   <i className="fa-solid fa-ticket me-3"></i>
// //                   Voucher
// //                 </SidebarItem>
// //               )}
// //             />
// //             <hr className="text-gray-300" />

// //             <NavLink
// //               to="terms-conditions"
// //               children={({ isActive }) => (
// //                 <SidebarItem
// //                   className={isActive ? "text-yellow-400 dark:text-yellow-500  font-bold" : "text-gray-500 dark:text-gray-400"}
// //                 >
// //                   <i className="fa-solid fa-circle-exclamation me-3"></i>
// //                   Terms & Conditions
// //                 </SidebarItem>
// //               )}
// //             />
// //             <hr className="text-gray-300" />
// //           </SidebarItemGroup>
// //         </SidebarItems>
// //       </Sidebar>
// //     </div>
// //   );
// // };

// // export default SideBar;

// import React, { useState } from 'react';
// import { FaTachometerAlt, FaClipboardList, FaUtensils, FaUsers, FaChartBar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const AdminSidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar visibility

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className={`h-full bg-white shadow-lg ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
//       {/* Toggle Button */}
//       <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-end'} p-2`}>
//         <button
//           onClick={toggleSidebar}
//           className={`p-2 ${isCollapsed ? 'text-gray-700 hover:text-gray-900' : 'bg-gray-100 rounded-full shadow hover:bg-gray-200'} transition`}
//         >
//           {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
//         </button>
//       </div>

//       {/* Sidebar Content */}
//       <div className="p-6">
//         {/* Navigation Link */}
//          <ul className="space-y-4">
//           <li>
//             <Link
//               to="/admin"
//               className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
//             >
//               <FaTachometerAlt className="text-gray-500" />
//               {!isCollapsed && <span className="ml-3">Dashboard</span>}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="reservation"
//               className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
//             >
//               <FaClipboardList className="text-gray-500" />
//               {!isCollapsed && <span className="ml-3">Reservation</span>}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="menu"
//               className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
//             >
//               <FaUtensils className="text-gray-500" />
//               {!isCollapsed && <span className="ml-3">Menu Lists</span>}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="employee"
//               className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
//             >
//               <FaUsers className="text-gray-500" />
//               {!isCollapsed && <span className="ml-3">Employee Lists</span>}
//             </Link>
//           </li>

//           <li>
//             <Link
//               to="report"
//               className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
//             >
//               <FaChartBar className="text-gray-500" />
//               {!isCollapsed && <span className="ml-3">Report</span>}
//             </Link>
//           </li>
//           <li>

//             <Link
//               to="adminAnnouncement"
//               className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
//             >
//               <i className="fa-solid fa-bullhorn text-gray-500"></i>
//               {!isCollapsed && <span className="ml-3">Announcement</span>}
//             </Link>
//           </li>
//           <li>

//             <Link
//               to="invoiceInfo"
//               className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
//             >
//               <i className="fa-solid fa-bullhorn text-gray-500"></i>
//               {!isCollapsed && <span className="ml-3">Invoice</span>}
//             </Link>
//           </li>
//         </ul>
        
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;
