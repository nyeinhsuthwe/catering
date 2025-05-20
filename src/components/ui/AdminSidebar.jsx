import React, { useState } from 'react';
import { FaTachometerAlt, FaClipboardList, FaUtensils, FaUsers, FaChartBar, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h-full bg-white shadow-lg ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      {/* Toggle Button */}
      <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-end'} p-2`}>
        <button
          onClick={toggleSidebar}
          className={`p-2 ${isCollapsed ? 'text-gray-700 hover:text-gray-900' : 'bg-gray-100 rounded-full shadow hover:bg-gray-200'} transition`}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="p-6">
        {/* Navigation Links */}
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
            >
              <FaTachometerAlt className="text-gray-500" />
              {!isCollapsed && <span className="ml-3">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/reservation"
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
            >
              <FaClipboardList className="text-gray-500" />
              {!isCollapsed && <span className="ml-3">Reservation</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
            >
              <FaUtensils className="text-gray-500" />
              {!isCollapsed && <span className="ml-3">Menu Lists</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/employee"
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
            >
              <FaUsers className="text-gray-500" />
              {!isCollapsed && <span className="ml-3">Employee Lists</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/report"
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'p-3 bg-gray-50 hover:bg-gray-100'} rounded-lg shadow-sm text-gray-700 hover:text-gray-900 font-medium transition`}
            >
              <FaChartBar className="text-gray-500" />
              {!isCollapsed && <span className="ml-3">Report</span>}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
