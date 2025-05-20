import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const { register, handleSubmit, setValue } = useForm();
  const [fileBase64, setFileBase64] = useState(null);

  useEffect(() => {
    const dummyCustomers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Employee",
        month: "January",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Employee",
        month: "February",
      },
      {
        id: 3,
        name: "Alice Win",
        email: "alice@example.com",
        role: "Admin",
        month: "January",
      },
    ];
    setCustomers(dummyCustomers);
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    const matchesMonth = selectedMonth ? customer.month === selectedMonth : true;
    const matchesRole = selectedRole ? customer.role === selectedRole : true;
    return matchesMonth && matchesRole;
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setFileBase64(base64);
      setValue("file", base64); // Set in form
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    console.log("Submitting file as Base64:", data.file);
    // Example POST request
    fetch("http://127.0.0.1:8000/api/employees/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 15|ptY7pnqSo4szT1xsJzgjixB46XdNxpnltFPOBu4Zc7a6b55c`,
      },
      body: JSON.stringify({ file: data.file }),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log("Upload successful:", resData);
      })
      .catch((error) => {
        console.error("Upload failed:", error);
      });
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredCustomers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "Registered_Employees.xlsx");
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
      
      {/* File Upload Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div id="fileUpload" className="max-w-md mb-4">
          <Label className="mb-2 block" htmlFor="file">
            Upload file
          </Label>
          <FileInput
            id="file"
            onChange={handleFileUpload}
            accept=".xls,.xlsx"
          />
        </div>
        <div className=" justify-end mb-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload to Backend
        </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Registered Employees
      </h2>

      <div className="flex gap-4 flex-wrap">
        <div className="mb-4 w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
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

        <div className="mb-4 w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Employee">Employee</option>
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
