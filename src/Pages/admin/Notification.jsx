// import { Bell } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function NotificationIcon() {
//   const [notifications, setNotifications] = useState([]);
//   const [showList, setShowList] = useState(false);

//   const { data: feedbackData } = useApiQuery(
//       {
//         endpoint: "/feedback/list",
//         queryKey: ["feedback"],
//       },
//       {
//         refetchOnWindowFocus: false,
//       }
//     );

//   const unreadCount = notifications.filter(n => !n.read).length;

//   return (
//     <div className="relative">
//       <button onClick={() => setShowList(!showList)} className="relative">
//         <Bell className="w-6 h-6" />
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {showList && (
//         <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-10">
//           {notifications.length === 0 ? (
//             <p className="p-2 text-sm text-gray-500">No new notifications</p>
//           ) : (
//             notifications.map(n => (
//               <div key={n.id} className="p-2 border-b text-sm hover:bg-gray-100">
//                 {n.message}
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

