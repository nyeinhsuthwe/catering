import ProtectedRoute from "../hooks/useProtectedRoute";
import AdminLayout from "../Layout/AdminLayout";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Employee/Dashboard";
import Feedback from "../Pages/Employee/Feedback";
import Profile from "../Pages/Employee/Profile";
import Menu from '../Pages/admin/Menu'
import AdminDashboard from '../Pages/admin/AdminDashboard'
import Reservation from '../Pages/admin/Reservation'
import Customer from '../Pages/admin/Customer'
import AdminProfile from '../Pages/admin/AdminProfile'
import Login from '../Pages/Login'
import AdminEditProfile from '../Pages/admin/AdminEditProfile'
import Announcement from '../Pages/admin/Announcement'

const DashRoute = [
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRole={["Employee"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "feedback",
        element: <Feedback />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRole={["Admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "employee",
        element: <Customer />,
      },
      {
        path: "adminProfile",
        element: <AdminProfile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "edit",
        element: <AdminEditProfile />,
      },
      {
          path: 'announcement',
          element: <Announcement/>
      },
      // {
      //     path: 'notification',
      //     element: <Notification/>
      // },
    ],
  },
];

export default DashRoute;
