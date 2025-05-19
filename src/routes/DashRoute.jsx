// DashRoute.js
import React from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Employee/Dashboard";
import ProtectedRoute from "../hooks/ProtectedRoute";
import Profile from "../Pages/Employee/Profile"; // Assuming this exists

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
    ],
  },
];

export default DashRoutes;
