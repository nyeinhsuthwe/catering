import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import Cookies from "js-cookie";
import Datatable from "react-data-table-component"

const userRole = Cookies.get("role") || "Employee"; // get user role from cookie, default Employee
const Customer = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const { handleSubmit, setValue } = useForm();
  const [fileBase64, setFileBase64] = useState(null);

  const queryClient = useQueryClient();

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    }
  ]

  const mutation = useApiMutation({
    onSuccess: (data) => {
      console.log("Upload successful:", data);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  const {
    data: employeeData,
    isLoading,
    error,
  } = useApiQuery(
    {
      endpoint: "/employees/list",
      queryKey: ["employee"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const availableRoles = [userRole];
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Calculate available months based on userRole and employeeData
  const availableMonths = React.useMemo(() => {
    if (userRole === "admin") {
      return allMonths;
    }
    if (employeeData && Array.isArray(employeeData)) {
      const monthsSet = new Set(
        employeeData
          .filter((emp) => emp.role === userRole)
          .map((emp) => emp.month)
          .filter(Boolean)
      );
      return Array.from(monthsSet);
    }
    return [];
  }, [userRole, employeeData]);
  //
  const filteredCustomers = Array.isArray(employeeData)
    ? employeeData.filter((customer) => {
        // restrict to current user's role only
        if (customer.role !== userRole) return false;

        if (selectedMonth && customer.month !== selectedMonth) return false;
        if (selectedRole && customer.role !== selectedRole) return false;

        return true;
      })
    : [];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setFileBase64(base64);
      setValue("file", base64);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    mutation.mutate({
      endpoint: "/employees/import",
      method: "POST",
      body: {
        filename: "employee file",
        file_base64: fileBase64,
      },
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

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div id="fileUpload" className="max-w-md mb-4">
          <Label className="mb-2 block" htmlFor="file">
            Upload file
          </Label>
          <FileInput
            id="file"
            type="file"
            onChange={handleFileUpload}
            accept=".xls,.xlsx"
          />
        </div>
        <div className="justify-end mb-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Uploading..." : "Upload"}
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
            {availableMonths.length > 0 ? (
              availableMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))
            ) : (
              <option disabled>No months available</option>
            )}
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
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <p className="text-gray-500">Loading employees...</p>}
      {error && <p className="text-red-500">Error loading employees.</p>}

      <Datatable
        title="Registered Employees"
        columns={columns}
        data={filteredCustomers}
        pagination
        paginationPerPage={10}
        highlightOnHover
        striped
        noDataComponent="No employees found"
        progressPending={isLoading}
        progressComponent={<div className="text-center">Loading...</div>}
        noHeader
        customStyles={{
          headCells: {
            style: {
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#f3f4f6",
            },
          },
          cells: {
            style: {
              paddingLeft: "8px",
              paddingRight: "8px",
            },
          },
        }}
      />
    </div>
  );
};

export default Customer;
