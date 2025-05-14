import React, { useEffect, useState } from 'react';

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  // Dummy data (replace with API call later)
  useEffect(() => {
    const dummyCustomers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '0912345678' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
      { id: 3, name: 'Alice Win', email: 'alice@example.com', phone: '0911223344' },
    ];
    setCustomers(dummyCustomers);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registered Customers</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-100 text-left">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">No customers found</td>
              </tr>
            ) : (
              customers.map((customer, index) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">{customer.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
