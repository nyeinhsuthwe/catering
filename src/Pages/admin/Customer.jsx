import React, { useState } from "react";
import * as XLSX from "xlsx";
import { FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import { toast } from "react-hot-toast";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow, Pagination
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

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);





  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success("Successfully deleted!");
    },
    onError: (error) => {
      console.error("Delete failed:", error?.response?.data?.message || error.message);
    },
  });


  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
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


  //Pagination
  const onPageChange = (page) => setCurrentPage(page);
  const totalItems = filteredCustomers.length;
  const paginatedData = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  //delete emp 
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);



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

          <div className="flex justify-end items-center mb-4">
            <label className="mr-2 font-medium text-sm dark:text-white text-gray-700">
              Items per page:
            </label>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // reset to first page when limit changes
              }}
              className="border border-gray-300 rounded p-2 text-sm dark:bg-gray-800 bg-white dark:text-white text-gray-800"
            >
              {[5, 10, 15, 20, 30].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

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
              {paginatedData.map((row, index) => (
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
                        onClick={() => handleDeleteClick(row.emp_id)}
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

        {totalItems > itemsPerPage && (
          <div className="flex overflow-x-auto justify-center mt-4">
            <Pagination
              layout="table"
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        )}

        {/* Delete emp  */}
        <Modal
          show={openDeleteModal}
          size="md"
          onClose={() => setOpenDeleteModal(false)}
          popup
        >
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this employee?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="red"
                  onClick={() => {
                    if (deleteId) {
                      deleteMutation.mutate({
                        endpoint: `employees/destroy/${deleteId}`,
                        method: "DELETE",
                      });
                      console.log(`Deleting Employee Data at: employees/destroy/${deleteId}`);
                    }
                    setOpenDeleteModal(false);
                  }}
                >
                  Yes, I'm sure
                </Button>
                <Button color="alternative" onClick={() => setOpenDeleteModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* Change role  */}
        <Modal
          show={isEditModalOpen}
          size="md"
          popup
          onClose={() => setIsEditModalOpen(false)}
        >
          <div className="p-6 rounded text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
            <h3 className="text-xl font-medium text-gray-700 dark:text-white mb-4">Edit Employee</h3>

            {editEmployee && (
              <div className="space-y-4">
                <p><strong>Employee ID:</strong> {editEmployee.emp_id}</p>
               

                <div>
                  
                  <label className="block text-sm font-medium  mb-2 ">
                    Enter Name:
                  </label>
                  <input
                    type="text"
                    value={editEmployee.name}
                    className="w-full block text-sm font-medium  mb-2 border-gray-200 text-gray-700 dark:text-white bg-white dark:bg-gray-800"
                    onChange={(e) =>
                      setEditEmployee((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <label className="block text-sm font-medium  mb-2 ">
                    Enter Email:
                  </label>
                  <input
                    type="text"
                    value={editEmployee.email}
                    className="w-full block text-sm font-medium  mb-2 border-gray-200 text-gray-700 dark:text-white bg-white dark:bg-gray-800"
                    onChange={(e) =>
                      setEditEmployee((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />

                  <label className="block text-sm font-medium  mb-2 ">
                    Select Role:
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
                Update
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
