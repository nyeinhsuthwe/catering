import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import Cookies from "js-cookie";
import Datatable from "react-data-table-component";

// const userRole = Cookies.get("role") || "Employee";

const Customer = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [filterName, setFilterName] = useState(""); // 👈 NEW
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
      name: "Emp ID",
      selector: (row) => row.emp_id,
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
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => handleDelete(row.emp_id)}
          >
            <i className="fa-solid fa-trash text-red-500 cursor-pointer ml-3"></i>
          </button>
        </div>
      ),
    }
  ];

  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success("Successfully deleted!");
    },
    onError: (error) => {
      console.error("Delete failed:", error?.response?.data?.message || error.message);
    },
  });

  const handleDelete = (emp_id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;
    deleteMutation.mutate({
      endpoint: `employees/destroy/${emp_id}`,
      method: "DELETE",
    });
    console.log(`Deleting Employee Data at: employees/destroy/${emp_id}`);
  };

  const mutation = useApiMutation({
    onSuccess: (data) => {
      console.log("Upload successful:", data);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

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

  const availableRoles = React.useMemo(() => {
    if (!employeeData) return [];
    const rolesSet = new Set(employeeData.map(emp => emp.role));
    return Array.from(rolesSet);
  }, [employeeData]);

  const filteredCustomers = React.useMemo(() => {
    if (!Array.isArray(employeeData)) return [];

    return employeeData.filter((employee) => {
      const matchesRole = selectedRole ? employee.role === selectedRole : true;
      const matchesName = filterName
        ? employee.name.toLowerCase().includes(filterName.toLowerCase())
        : true;

      return matchesRole && matchesName;
    });
  }, [employeeData, selectedRole, filterName]);

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

      {/* 🔍 Filters Section */}
      <div className="flex gap-4 flex-wrap mb-4">
        {/* Filter by Role */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="">All Roles</option>
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Name */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Name
          </label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Enter name..."
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>

      {isLoading && <p className="text-gray-500">Loading employees...</p>}
      {error && <p className="text-red-500">Error loading employees.</p>}
      
      {/* Total Count Display */}
      <div className="mb-4 text-gray-700 font-semibold">
        Total Registered Employees: {filteredCustomers.length}
      </div>

      <Datatable
        title="Registered Employees"
        columns={columns}
        data={filteredCustomers}
        pagination
        paginationPerPage={10}
        highlightOnHover
        paginationRowsPerPageOptions={[10, 15, 20, 25]}
      />
    </div>
  );
};

export default Customer;
