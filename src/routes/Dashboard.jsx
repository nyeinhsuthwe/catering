import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Home";

const Dashboard = [
    {
        path: '/home',
        element: <DashboardLayout />,
        children: [ 
            {
                index: true,
                element: <Home />
            },
        ]
    }
];

export default Dashboard;
