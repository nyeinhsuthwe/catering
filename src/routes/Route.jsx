import { createBrowserRouter , Navigate } from "react-router-dom";
import AuthLayout from "../Layout/Authlayout";
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
import Record from '../Pages/Employee/Record';
import Announcement from "../Pages/Employee/Announcement";
import { restrictLoader } from "../hooks/restrictLoader";
import AdminAnnouncement from "../Pages/admin/AdminAnnouncement";

// import Router from "./Router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        loader: restrictLoader,
      },
    ],
  },
  {
    path: "/employee",
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
      {
        path: "record",
        element: <Record/>
      },
      {
        path: "announcement",
        element: <Announcement/>
      }
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
        path: "profile",
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
      // {
      //     path: 'addnewfood',
      //     element: <AddNewFood/>
      // },
      {
        path: "adminAnnouncement",
        element: <AdminAnnouncement />,
      }
    ],
  },
]);

export default router;
