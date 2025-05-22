import ProtectedRoute from "../hooks/useProtectedRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Employee/Dashboard";
import Feedback from "../Pages/Employee/Feedback";
import Profile from "../Pages/Employee/Profile";

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
                element: <Dashboard />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "feedback",
                element: <Feedback />
            }
        ]       
    }
]

export default DashRoute;