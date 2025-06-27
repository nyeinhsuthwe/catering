import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Pagination } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useApiQuery } from "../../hooks/useQuery";

const Holiday = () => {
  const { handleSubmit, setValue } = useForm();
  const [fileBase64, setFileBase64] = useState(null);
  const [fileName, setFileName] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editHoliday, setEditHoliday] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useApiMutation({
    onSuccess: (data) => {
      console.log("Upload successful:", data);
      toast.success("Holiday file imported successfully!");
      queryClient.invalidateQueries({ queryKey: ["holiday"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error?.response?.data || error.message);
      const msg = error?.response?.data?.message || "Upload failed. Please try again.";
      toast.error(msg);
    },
  });

  const onSubmit = () => {
    if (!fileBase64 || !fileName) {
      toast.error("Please select a valid Excel file to upload.");
      return;
    }

    toast("Uploading holiday file...");

    mutation.mutate({
      endpoint: "/holiday/import-base64",
      method: "POST",
      body: {
        filename: fileName,
        file_base64: fileBase64,
      },
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setFileBase64(base64);
      setValue("file_base64", base64);
      setValue("filename", file.name);
    };
    reader.readAsDataURL(file);
  };


  //View HOliday File
  const { data: announce } = useApiQuery(
    {
      endpoint: "/holiday/list",
      queryKey: ["holiday"],
      method: "GET",
      onSuccess: (data) => {
        setAnnouncements(data);
      },
      onError: (error) => {
        console.error("Error fetching holiday:", error);
      },
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  //Delete Holiday
  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['holiday'] })
      toast.success("successfully deleted!");

    },
    onError: (error) => {
      console.error(
        "Delete failed:",
        error?.response?.data?.message || error.message
      );
    },
  });
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const holidayUpdateMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["holiday"] });
      toast.success("Holiday updated successfully!");
    },
    onError: (error) => {
      console.error("Update failed:", error);
      toast.error("Failed to update holiday");
    },
  });
  const handleChangeHoliday = (holiday) => {
    holidayUpdateMutation.mutate({
      endpoint: `/holiday/update/${holiday.date}`,
      method: "PUT",
      body: {
        name: holiday.name,
        date: holiday.date,
        // id: holiday.h_id,
      },
    });
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  //Pagination
  const onPageChange = (page) => setCurrentPage(page);
  const totalItems = (announce || []).length;
  const paginatedData = (announce || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <>
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:bg-gray-700 bg-white dark:text-white">Upload Holiday File</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <div id="fileUpload" className="max-w-md mb-4">
            <Label className="mb-2 block " htmlFor="file">
              Upload Holiday File (.xls, .xlsx)
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
              className="  px-4 py-2 rounded text-white  bg-yellow-400 dark:bg-yellow-400 hover:bg-yellow-500 dark:hover:bg-yellow-500"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>

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
            {[1, 5, 10, 15, 20, 30].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <Table striped>
          <TableHead>
            <TableHeadCell>No</TableHeadCell>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Holiday Title</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>

          </TableHead>
          <TableBody className="divide-y">
            {(paginatedData || []).map((row, index) => (
              <TableRow
                key={row.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 border-0"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </TableCell>
                <TableCell>{row.h_id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>

                <TableCell>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setEditHoliday(row);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <i className="fas fa-edit text-blue-600 cursor-pointer ml-4"></i>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteClick(row.date)}
                    >
                      <i className="fa-solid fa-trash text-red-500 cursor-pointer ml-2"></i>
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
      </div>

      {/* //Delete Holiday Modal */}
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
              Are you sure you want to delete this holiday?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="red"
                onClick={() => {
                  if (deleteId) {
                    deleteMutation.mutate({
                      endpoint: `holiday/destroy/${deleteId}`,
                      method: "DELETE",
                    });
                    console.log(`Deleting Holiday at: holiday/destroy/${deleteId}`);
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

      {/* Edit Holiday Modal */}
      <Modal
        show={isEditModalOpen}
        size="md"
        popup
        onClose={() => setIsEditModalOpen(false)}
      >
        <div className="p-6 text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
          <h3 className="text-xl font-medium text-gray-700 dark:text-white mb-4">Edit Holiday</h3>

          {editHoliday && (
            <div className="space-y-4">
              {/* <p><strong>ID:</strong> {editHoliday.h_id}</p> */}
              <label className="block text-sm font-medium  mb-2 ">
                Enter Holiday Title:
              </label>
              <input
                type="text"
                value={editHoliday.name}
                className="w-full block text-sm font-medium  mb-2 border-gray-200 text-gray-700 dark:text-white bg-white dark:bg-gray-800"
                onChange={(e) =>
                  setEditHoliday((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <label className="block text-sm font-medium  mb-2 ">
                Enter Hoiday Date:
              </label>
              <input
                type="date"
                value={editHoliday.date}
                className="w-full block text-sm font-medium  mb-2 border-gray-200 text-gray-700 dark:text-white bg-white dark:bg-gray-800"

                onChange={(e) =>
                  setEditHoliday((prev) => ({ ...prev, date: e.target.value }))
                }
              />


            </div>
          )}

          <div className="mt-6 flex justify-end gap-2">
            <Button
              className="text-white rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
              onClick={() => {
                handleChangeHoliday(editHoliday);
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

    </>
  );
};

export default Holiday;
