import React, { useState } from "react";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import useMenuStore from "../../store/menuStore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "flowbite-react";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const MenuListTable = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();
  const { reset } = useForm();

  // Fetch food month data
  const { data: foodMonthCreate } = useApiQuery(
    {
      endpoint: "/foodmonth/list",
      queryKey: ["foodmonthprice"],
    },
    {
      onSuccess: () => {},
    }
  );

  // Menu creation mutation
  const menuListMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  const handleCreateMenu = (data) => {
    const newMenus = data.menus.flatMap((menu) =>
      menu.food_name.map((food) => ({
        food_name: typeof food === "string" ? food : food.name,
        price: data.price,
        date: menu.created_at,
      }))
    );

    menuListMutation.mutate(
      {
        endpoint: "/foodmonth/create",
        method: "POST",
        body: {
          items: newMenus,
          price: data.price,
        },
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success("Menu created successfully!");
          queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(
            error?.response?.data?.message ||
              "Creation failed. Please try again."
          );
        },
      }
    );
  };

  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
      toast.success("Successfully deleted!");
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

  const navigate = useNavigate();

  const handleEdit = (selectedRow) => {
    const selectedDate = selectedRow.date;

    // Get all rows with the same date
    const menusForDate = (foodMonthCreate || []).filter(
      (item) => item.date === selectedDate
    );

    if (menusForDate.length === 0) return;

    const groupedMenu = {
      price: menusForDate[0].price,
      menus: [
        {
          date: selectedDate,
          items: menusForDate.map((item) => ({
            food_name: item.food_name,
          })),
        },
      ],
    };

    navigate("/admin/menu/edit-menu", { state: groupedMenu });
  };

  const filteredData = (foodMonthCreate || []).filter((item) =>
    item.food_name.toLowerCase().includes(searchText.toLowerCase())
  );

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  //Pagination
  const onPageChange = (page) => setCurrentPage(page);
  const totalItems = filteredData.length;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  //deleteMenu
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  return (
    <div className="p-6 mb-3 rounded-lg shadow-md text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
      <>
        {/* //Menu List Table */}
        <h2 className="text-xl font-bold mb-4">Menu Lists</h2>
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
        <Table hoverable striped>
          <TableHead>
            <TableHeadCell>No.</TableHeadCell>
            <TableHeadCell>Menu Name</TableHeadCell>
            <TableHeadCell>Price (MMK)</TableHeadCell>
            <TableHeadCell>Month</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
                  No menu records found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow key={row.emp_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.food_name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <div className="space-x-2">
                      <button onClick={() => handleEdit(row)}>
                        <i className="fas fa-edit text-blue-600 cursor-pointer ml-4"></i>
                      </button>

                      <button onClick={() => handleDeleteClick(row.date)}>
                        <i className="fa-solid fa-trash text-red-500 cursor-pointer ml-2"></i>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
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
                Are you sure you want to delete this menu?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="red"
                  onClick={() => {
                    if (deleteId) {
                      deleteMutation.mutate({
                        endpoint: `foodmonth/destroy/${deleteId}`,
                        method: "DELETE",
                      });
                      console.log("Deleting menu for date:", deleteId);
                    }
                    setOpenDeleteModal(false);
                  }}
                >
                  Yes, I'm sure
                </Button>
                <Button
                  color="alternative"
                  onClick={() => setOpenDeleteModal(false)}
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
    </div>
  );
};

export default MenuListTable;
