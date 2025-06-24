import React, { useState } from "react";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import useMenuStore from "../../store/menuStore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

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
            onSuccess: () => { },
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
                        error?.response?.data?.message || "Creation failed. Please try again."
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
            console.error("Delete failed:", error?.response?.data?.message || error.message);
        },
    });

    const handleDelete = (date) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteMutation.mutate({
                endpoint: `foodmonth/destroy/${date}`,
                method: "DELETE",
            });
        }
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


    const columns = [
        {
            name: "No.",
            selector: (row, index) => index + 1,
            width: "70px",
        },
        {
            name: "Menu Name",
            selector: (row) => row.food_name,
            sortable: true,
        },
        {
            name: "Price (MMK)",
            selector: (row) => parseFloat(row.price).toFixed(2),
            sortable: true,
        },
        {
            name: "Month",
            selector: (row) => row.date,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="space-x-2">
                    <button onClick={() => handleEdit(row)}>
                        <i className="fas fa-edit text-blue-600 cursor-pointer ml-4"></i>
                    </button>

                    <button onClick={() => handleDelete(row.date)}>
                        <i className="fa-solid fa-trash text-red-500 cursor-pointer ml-2"></i>
                    </button>
                </div>
            ),
        },
    ];

    const filteredData = (foodMonthCreate || []).filter((item) =>
        item.food_name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-md mb-6">            {/* Optional search input */}
            {/* <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search menus..."
        className="mb-2 p-2 border border-gray-300 rounded"
      /> */}

            <DataTable
                title="Menu Lists"
                columns={columns}
                data={filteredData || []}
                pagination
                highlightOnHover
                striped
                responsive
                noDataComponent={<div className="py-6 text-gray-500">No menu items found</div>}
                customStyles={{
                    headCells: {
                        style: {
                            fontSize: "15px",
                            fontWeight: "bold",
                            backgroundColor: "#f3f4f6",
                        },
                    },
                    cells: {
                        style: {
                            paddingLeft: "13px",
                            paddingRight: "8px",
                        },
                    },
                }}
            />

        </div>
    );
};

export default MenuListTable;
