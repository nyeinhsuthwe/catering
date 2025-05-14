import React from 'react'

const AdminDashboard = () => {
  return(
  <div className="p-6 bg-white rounded-lg shadow-md">
  {/* Header */}
  <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

  {/* Stats Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    {/* Card 1 */}
    <div className="p-4 bg-blue-100 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-blue-800">Total Reservations</h2>
      <p className="text-2xl font-bold text-blue-900 mt-2">120</p>
    </div>
    {/* Card 2 */}
    <div className="p-4 bg-green-100 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-green-800">Total Orders</h2>
      <p className="text-2xl font-bold text-green-900 mt-2">85</p>
    </div>
    {/* Card 3 */}
    <div className="p-4 bg-yellow-100 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-yellow-800">Total Customers</h2>
      <p className="text-2xl font-bold text-yellow-900 mt-2">45</p>
    </div>
  </div>
  {/* Recent Activity Section */}
  <div className="bg-gray-50 p-4 rounded-lg shadow">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
  <ul className="space-y-3">
    <li className="flex items-center justify-between">
      <span className="text-gray-700">New reservation by John Doe</span>
      <span className="text-sm text-gray-500">2 hours ago</span>
    </li>
    <li className="flex items-center justify-between">
      <span className="text-gray-700">Order #123 completed</span>
      <span className="text-sm text-gray-500">4 hours ago</span>
    </li>
    <li className="flex items-center justify-between">
      <span className="text-gray-700">New customer added: Jane Smith</span>
      <span className="text-sm text-gray-500">6 hours ago</span>
    </li>
  </ul>
</div>
</div>

  );
};

export default AdminDashboard
