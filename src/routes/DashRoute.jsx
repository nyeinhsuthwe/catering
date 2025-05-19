import React from 'react'
import Menu from '../Pages/admin/Menu'
import AdminDashboard from '../Pages/admin/AdminDashboard'
import AdminLayout from '../Layout/AdminLayout'
import Reservation from '../Pages/admin/Reservation'
import Customer from '../Pages/admin/Customer'
import AdminProfile from '../Pages/admin/AdminProfile'
import Login from '../Pages/Login'
import AdminEditProfile from '../Pages/admin/AdminEditProfile'
import ProtectedRoute from '../hooks/ProtectedRoute'

const DashRoute = () => {
  
    {
        path: '/',
            element: (
            <ProtectedRoute allowedRoles={['Admin']}>
            <AdminLayout />
            </ProtectedRoute>
),


        children: [
            {
                        index: true,
                        element: <AdminDashboard />
                    },
                    {
                        path: 'admin', 
                        element: <AdminDashboard />
                    },
                    {
                        path: 'menu', 
                        element: <Menu />
                    },
                    {
                        path: 'reservation', 
                        element: <Reservation />    
                    },
                    {
                        path: 'employee', 
                        element: <Customer />    
                    },
                    {
                        path: 'profile', 
                        element: <AdminProfile />    
                    },
                    {
                        path: 'login', 
                        element: <Login />   
                    },
                    {
                        path: 'edit', 
                        element: <AdminEditProfile />   
                    },
                ]


                

    }
}

export default DashRoute;
