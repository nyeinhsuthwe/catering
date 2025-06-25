import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FileInput, Label, Modal, Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import Cookies from "js-cookie";
import Datatable from "react-data-table-component";
import { toast } from "react-hot-toast";
import { AlignLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";



const Customer = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [filterName, setFilterName] = useState("");
  const { handleSubmit, setValue } = useForm();
  const [fileBase64, setFileBase64] = useState(null);

  const [editEmployee, setEditEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const queryClient = useQueryClient();

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "75px",
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
        <div className="space-x-2 flex items-center">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => {
              setEditEmployee(row); // carry all data
              setIsEditModalOpen(true);
            }}
          >
            <i className="fas fa-edit text-blue-600 cursor-pointer ml-4"></i>
          </button>

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
      toast.success("File uploaded successfully!");
      console.log("Upload successful:", data);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
      toast.dismiss();
      toast.error(
        error?.response?.data?.message || "Update failed. Please try again."
      );
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



  const handleChangeRole = (emp_id, newRole) => {
    const confirm = window.confirm(`Change role to ${newRole}?`);
    if (!confirm) return;
    roleUpdateMutation.mutate({
      endpoint: `/admins/${emp_id}`,
      method: "PUT",
      body: {
        name: editEmployee.name,
        email: editEmployee.email,
        role: newRole,
      },
    });
  };

  const roleUpdateMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employee"] });
      toast.success("Role updated successfully!");
    },
    onError: (error) => {
      console.error("Update failed:", error);
      toast.error("Failed to update role");
    },
  });




  return (
    <div className="p-6 max-w-5xl mx-auto">


      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div id="fileUpload" className="max-w-md mb-4">
          <Label className="mb-2 block " htmlFor="file">
            Upload file
          </Label>
          <FileInput
            className="bg-white  text-gray-800 dark:bg-gray-800 dark:text-white "
            id="file"
            type="file"
            onChange={handleFileUpload}
            accept=".xls,.xlsx"
          />
        </div>
        <div className="justify-end mb-4">
          <button
            type="submit"
            className=" px-4 py-2 rounded text-white bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      <div className="p-6  rounded-lg shadow-md text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">
          Registered Employees
        </h2>

        {/* 🔍 Filters Section */}
        <div className="flex gap-4 flex-wrap mb-4">
          {/* Filter by Role */}
          <div className="w-full md:w-1/3 ">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2 ">
              Filter by Role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
            >
              <option value="">Select Role</option>
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>


          </div>

          {/* Filter by Name */}
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium  mb-2 ">
              Filter by Name
            </label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Enter name..."
              className="p-2 border border-gray-300 rounded w-full text-gray-800 dark:bg-gray-800 bg-white dark:text-white "
            />
          </div>
        </div>

        {isLoading && <p className="text-gray-500">Loading employees...</p>}
        {error && <p className="text-red-500">Error loading employees.</p>}

        {/* Total Count Display */}
        <div className="mb-4 text-gray-700 dark:text-white font-semibold">
          Total Registered Employees: {filteredCustomers.length}
        </div>
        <div className="overflow-x-auto bg-white text-gray-700 dark:bg-gray-800 dark:text-white p-4 rounded">

        <Table striped>
          <TableHead>
            <TableHeadCell>No</TableHeadCell>
            <TableHeadCell>Emp ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Actions</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {filteredCustomers.map((row, index) => (
              <TableRow key={row.emp_id} className="bg-white dark:border-gray-700 dark:bg-gray-800 border-0">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.emp_id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setEditEmployee(row);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <i className="fas fa-edit text-blue-600 cursor-pointer"></i>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(row.emp_id)}
                    >
                      <i className="fa-solid fa-trash text-red-500 cursor-pointer"></i>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>



        <Modal
          show={isEditModalOpen}
          size="md"
          popup
          onClose={() => setIsEditModalOpen(false)}
        >
          <div className="p-6 text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
            <h3 className="text-xl font-medium text-gray-700 dark:text-white mb-4">Edit Role</h3>

            {editEmployee && (
              <div className="space-y-4">
                <p><strong>ID:</strong> {editEmployee.emp_id}</p>
                <p><strong>Name:</strong> {editEmployee.name}</p>
                <p><strong>Email:</strong> {editEmployee.email}</p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={editEmployee.role}
                    onChange={(e) =>
                      setEditEmployee({ ...editEmployee, role: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded p-2 text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
                  >
                    <option value="employee">employee</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <Button
                className="text-white rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
                onClick={() => {
                  handleChangeRole(editEmployee.emp_id, editEmployee.role);
                  setIsEditModalOpen(false);
                }}
              >
                Save
              </Button>
              <Button className="text-white rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>




      </div>
    </div>
  );
};

export default Customer;
