import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Employee/Dashboard";
import Profile from "../Pages/Employee/Profile";
import History from "../Pages/Employee/History"

const EmployeeDashboard = [
    {
        path: '/',
        element: <DashboardLayout />,
        children: [ 
            {
                index: true,
                element: <Dashboard/>
            },
             {
                path : '/profile',
                element: <Profile/>
            }
        ]
    }
];

export default EmployeeDashboard;
