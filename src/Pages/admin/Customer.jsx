import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library for Excel export

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(''); // State for filtering by month
  const [selectedRole, setSelectedRole]=useState('');


  // Dummy data (replace with API call later)
  useEffect(() => {
    const dummyCustomers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Employee', month: 'January' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Employee', month: 'February' },
      { id: 3, name: 'Alice Win', email: 'alice@example.com', role: 'Admin', month: 'January' },
    ];
    setCustomers(dummyCustomers);
  }, []);

   // Filter customers by selected month and role
   const filteredCustomers = customers.filter((customer) => {
    const matchesMonth = selectedMonth ? customer.month === selectedMonth : true;
    const matchesRole = selectedRole ? customer.role === selectedRole : true;
    return matchesMonth && matchesRole;
  });

      // Handle export to Excel
  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCustomers); // Convert data to worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees'); // Append the worksheet
    XLSX.writeFile(workbook, 'Registered_Employees.xlsx'); // Export the file
  };

        

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-end mb-4">
      <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleExportToExcel}
        >
          Export 
        </button>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Registered Employees</h2>
      
    <div className="flex ">
    <div className="mb-4 w-100 ">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Month</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        >
          <option value="">All Months</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>


           {/* Role Filter */}
      <div className="mb-4 w-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Employee</option>
          
        </select>
      </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-100 text-left">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer, index) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{customer.id}</td>
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">{customer.role}</td>
                  <td className="px-4 py-2 text-center">
                    
                  </td>
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