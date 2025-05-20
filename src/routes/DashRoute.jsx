// DashRoute.js
import React from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Employee/Dashboard";
import ProtectedRoute from "../hooks/ProtectedRoute";
import Profile from "../Pages/Employee/Profile"; // Assuming this exists
import Feedback from "../Pages/Employee/Feedback";

const DashRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["Employee"]}>
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
        element: <Feedback/>,
      },
    ],
  },
];

export default DashRoutes;
