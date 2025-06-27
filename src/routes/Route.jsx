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
import Login from '../Pages/Login'
import Record from '../Pages/Employee/Record';
import Announcement from "../Pages/Employee/Announcement";
import { restrictLoader } from "../hooks/restrictLoader";
import AdminAnnouncement from "../Pages/admin/AdminAnnouncement";
import Report from "../Pages/admin/Report";
import FeedbackRecord from "../Pages/admin/FeedbackRecord";
import FeedbackTable from "../Pages/admin/FeedbackTable";
import MealCheckoutDetails from "../Pages/admin/MealCheckoutDetails";
import MenuUpdate from "../Pages/admin/MenuUpdate";
import AdminProfile from "../Pages/admin/AdminProfile";
import AdminEditProfile from "../Pages/admin/AdminEditProfile";
import AdminResetPassword from "../Pages/admin/AdminResetPassword"
import InvoiceInfo from "../Pages/admin/InvoiceInfo"
import ViewEmpOrderDetail from "../Pages/admin/ViewEmpOrderDetail";
import SendInvoice from "../Pages/admin/SendInvoice"
import MenuOrderBar from "../Pages/admin/MenuOrderBar";
import MealAttendanceDonut from "../Pages/admin/MealAttendanceDonut";
import MenuOrderPie from "../Pages/admin/MenuOrderPie";
import RatingPieChart from "../Pages/admin/RatingPieChart";



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
        path: "login",
        element: <Login />,
      },
           
      {
        path: "adminAnnouncement",
        element: <AdminAnnouncement />,
      },
      {
        path: "report",
        element: <Report/>,
      },
      {
        path: "feedback",
        element: <FeedbackRecord />,
      },
      {
        path: "feedbackTable",
        element: <FeedbackTable />,
      },
      {
        path: "mealCheckoutDetails",
        element: <MealCheckoutDetails />,
      },
      {
        path: "menu/edit-menu",
        element: <MenuUpdate />,
      },
      {
        path: "adminProfile",
        element: <AdminProfile/>

      },
      {
        path: "/admin/adminProfile/adminEditProfile",
        element: <AdminEditProfile/>
      },
      {
        path: "/admin/adminProfile/adminResetPassword",
        element: <AdminResetPassword/>
      },
      // {
      //   path: "/admin/adminProfile/order",
      //   element: <Order/>
      // }
      {
        path: "invoiceInfo",
        element: <InvoiceInfo/>
      },
      {
        path: "viewEmpOrderDetail",
        element: <ViewEmpOrderDetail/>
      },
      {
        path: "/admin/invoiceInfo/sendInvoice",
        element: <SendInvoice/>
      },
      {
        path: "menuOrderBar",
        element: <MenuOrderBar/>
      },
      
      {
        path: "menuOrderPie",
        element: <MenuOrderPie/>
      },
      {
        path: "mealAttendanceDonut",
        element: <MealAttendanceDonut/>
      },
      {
        path: "ratingPieChart",
        element: <RatingPieChart/>
      }


     
     
  
    ],
  },
]);

export default router;
