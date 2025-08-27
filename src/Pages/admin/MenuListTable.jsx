import React, { useState, useMemo } from "react";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Pagination, Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const MenuListTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const queryClient = useQueryClient();
  const { reset } = useForm();
  const navigate = useNavigate();

  // Fetch food month data
  const { data: foodMonthCreate = [] } = useApiQuery(
    { endpoint: "/foodmonth/list", queryKey: ["foodmonthprice"] },
    { onSuccess: () => {} }
  );

  // Delete mutation
  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
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

  const handleEdit = (row) => {
    const selectedDate = row.date;
    const menusForDate = foodMonthCreate.filter((item) => item.date === selectedDate);

    if (!menusForDate.length) return;

    const groupedMenu = {
      price: menusForDate[0].price,
      menus: [
        {
          date: selectedDate,
          items: menusForDate.map((item) => ({ food_name: item.food_name })),
        },
      ],
    };

    navigate("/admin/menu/edit-menu", { state: groupedMenu });
  };

  // Filtered data based on search text and selected month
  const filteredData = useMemo(() => {
    return foodMonthCreate.filter((item) => {
      const matchesSearch = item.food_name.toLowerCase().includes(searchText.toLowerCase());
      const matchesMonth = selectedMonth ? item.date.startsWith(selectedMonth) : true;
      return matchesSearch && matchesMonth;
    });
  }, [foodMonthCreate, searchText, selectedMonth]);

  const totalItems = filteredData.length;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 mb-3 rounded-lg shadow-md text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
      <h2 className="text-xl font-bold mb-4">Menu Lists</h2>

      {/* Filters */}
      <div className="flex gap-4 justify-end items-center mb-4 flex-wrap">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded text-gray-800 dark:text-white dark:bg-white"
        />

        <label className="mr-2 font-medium text-sm dark:text-white text-gray-700">
          Items per page:
        </label>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
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
              <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                No menu records found.
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, index) => (
              <TableRow key={row.date + index}>
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
            onPageChange={setCurrentPage}
            showIcons
          />
        </div>
      )}

      {/* Delete Modal */}
      <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup>
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
    </div>
  );
};

export default MenuListTable;
