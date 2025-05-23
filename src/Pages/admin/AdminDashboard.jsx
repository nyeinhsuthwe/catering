// import React, { useState } from 'react';

const AdminDashboard = () => {
  // Sample data for cards
  const totalData = {
    reservations: 120,
    orders: 85,
    customers: 45,
  };

  // // Sample data for charts
  // const [selectedPeriod, setSelectedPeriod] = useState('Month'); // Default period
  

  // Sample data for order lists
  const orders = [
    { no: 1, id: 'ORD001', date: '2025-01-05', customer: 'John Doe', amount: '$120', status: 'Completed' },
    { no: 2, id: 'ORD002', date: '2025-01-12', customer: 'Jane Smith', amount: '$150', status: 'Pending' },
    { no: 3, id: 'ORD003', date: '2025-02-10', customer: 'Alice Johnson', amount: '$200', status: 'Completed' },
  ];

  return (
    <div className="p-6 bg-gray-100">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">Total Reservations</h2>
          <p className="text-2xl font-bold text-blue-600 mt-2">{totalData.reservations}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">Total Orders</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">{totalData.orders}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800">Total Employee</h2>
          <p className="text-2xl font-bold text-yellow-600 mt-2">{totalData.customers}</p>
        </div>
      </div>

      

      {/* Order List Section */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Lists</h2>
       
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-sm text-gray-700">{order.no}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;