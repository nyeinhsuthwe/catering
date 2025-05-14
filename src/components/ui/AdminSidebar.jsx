import React from 'react'
import { FaTachometerAlt, FaClipboardList, FaUtensils, FaUsers, FaChartBar } from 'react-icons/fa';


const AdminSidebar = () => {
  return (
    <div className="w-64 h-full bg-white shadow-lg rounderd-lg p-6">
    {/* Sidebar Header */}
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Panel</h2>

    {/* Navigation Links */}
    <ul className="space-y-4">
      <li>
        <a href="/" className="flex items-center p-3 bg-gray-50 hover:bg-gray-1 rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition">
          <FaTachometerAlt className="mr-3 text-blue-500" /> Dashboard
        </a>
      </li>
      <li>
        <a href="/reservation" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition">
          <FaClipboardList className="mr-3" /> Reservation
        </a>
      </li>
      <li>
      <a href="/menu" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition">
            <FaUtensils className="mr-3 text-yellow-500" /> Menu Lists
          </a>
        </li>
        <li>
          <a href="/employee" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition">
            <FaUsers className="mr-3 text-purple-500" /> Employee Lists
          </a>
        </li>
        <li>
          <a href="/report" className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition">
            <FaChartBar className="mr-3 text-red-500" /> Report
          </a>
        </li>
      </ul>
    </div>
  )
}

export default AdminSidebar
