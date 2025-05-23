import React, { useState } from 'react';

const Reservation = () => {
   // Sample data for reservations
   const reservations = {
    January: [
      { id: 1, name: 'John Doe', orderCode: 'ORD123', date: '2025-01-05', time: '6:00 PM', amount: '$120' },
      { id: 2, name: 'Jane Smith', orderCode: 'ORD124', date: '2025-01-12', time: '7:30 PM', amount: '$150' },
    ],
    February: [
      { id: 3, name: 'Alice Johnson', orderCode: 'ORD125', date: '2025-02-10', time: '5:00 PM', amount: '$200' },
      { id: 4, name: 'Bob Brown', orderCode: 'ORD126', date: '2025-02-18', time: '8:00 PM', amount: '$180' },
    ],
    March: [
      { id: 5, name: 'Charlie Davis', orderCode: 'ORD127', date: '2025-03-15', time: '7:00 PM', amount: '$220' },
      { id: 6, name: 'Diana Evans', orderCode: 'ORD128', date: '2025-03-20', time: '6:30 PM', amount: '$250' },
    ],
    // Add more months and data as needed
  };
  const [selectedMonth, setSelectedMonth] = useState('January'); // Default month

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer Reservations</h1>

      {/* Dropdown */}
      <div className="mb-6">
        <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
          Select Month:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.keys(reservations).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Customer ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Order Code
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
          {reservations[selectedMonth].map((reservation, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">{reservation.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{reservation.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{reservation.orderCode}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{reservation.date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{reservation.time}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{reservation.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservation;