
import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/ui/AdminSidebar'
import AdminTopbar from '../components/ui/AdminTopbar'
import Nav from '../components/ui/Nav'
import DarkModeToggle from '../components/ui/DarkModeToggle'
import { DarkThemeToggle } from 'flowbite-react'
const AdminLayout = () => {
  return (
    
    <div className="flex flex-col h-screen dark:bg-black">

      <AdminTopbar />
      
      <div className="flex min-h-screen"> 
        <AdminSidebar />
        <div className="flex-1 p-6 bg-gray-100 h-screen overflow-y-auto dark:bg-black">
          
      
          <Outlet />
        </div>

        
      </div>
    </div>
  )
}

export default AdminLayout
