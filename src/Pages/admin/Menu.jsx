import React, { useState } from "react";
import { Popover } from "flowbite-react";
import { MultiSelect } from "primereact/multiselect";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import useMenuStore from "../../store/menuStore";
import { Controller, useForm, useFieldArray } from "react-hook-form";

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [newFoodName, setNewFoodName] = useState("");
  const queryClient = useQueryClient();

  const { menuLists, setMenuLists } = useMenuStore();

  const mutation = useApiMutation({
    onSuccess: (data) => {
      console.log("successful:", data);
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  const { data: foodLists } = useApiQuery(
    {
      endpoint: "/food/list",
      queryKey: ["foods"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: foodMonthCreate } = useApiQuery(
    {
      endpoint: "/foodmonth/list",
      queryKey: ["foodmonthprice"],
    },
    {
      onSuccess: (data) => { },
    }
  );

  const { register, handleSubmit, control, reset } = useForm(
    {
      defaultValues: {
        menus: [{ food_name: [], created_at: "" }]
      }
    }
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menus"
  });

  const createMenu = async () => {
    const food = { name: newFoodName.trim() };
    mutation.mutate({
      endpoint: "/food/create",
      method: "POST",
      body: food,
    });
  };

  const menuListMutation = useApiMutation({
    onSuccess: (data) => {
      console.log("successful:", data);
      queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });



  const onSubmit = (data) => {
    if (!data.price || !data.menus || data.menus.length === 0) {
      alert("Please select at least one menu, price, and date.");
      return;
    }

    // Validate each menu block
    for (const menu of data.menus) {
      if (!menu.food_name || menu.food_name.length === 0 || !menu.created_at) {
        alert("Please select food(s) and date for each menu.");
        return;
      }
    }

    // Transform data for the backend
    const newMenus = data.menus.flatMap((menu) =>
      menu.food_name.map((food) => ({
        food_name: food.name,
        price: data.price,
        date: menu.created_at,
      }))
    );

    console.log("Sending menus:", newMenus);

    menuListMutation.mutate({
      endpoint: "/foodmonth/create",
      method: "POST",
      body: { items: newMenus ,price: data.price},
    });

    let updatedMenus = [...menus];
    if (editIndex !== null) {
      updatedMenus[editIndex] = {
        name: newMenus[0].food_name,
        price: newMenus[0].price,
        month: newMenus[0].date,
      };
      setEditIndex(null);
    } else {
      updatedMenus = [...menus, ...newMenus];
    }

    setMenus(updatedMenus);
    reset();
  };


  const handleAddFood = () => {
    if (!newFoodName.trim()) {
      alert("Please enter a valid food name.");
      return;
    }

    const newFood = {
      name: newFoodName.trim(),
      food_id: `food_${Date.now()}`,
    };

    setNewFoodName("");
  };

  const handleEdit = (index) => {
    const menu = foodMonthCreate[index];
    setEditIndex(index);
    reset({
      food_name: [{ name: menu.name }],
      price: menu.price,
      created_at: menu.date,
    });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      const updatedMenus = [...menus];
      updatedMenus.splice(index, 1);
      setMenus(updatedMenus);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-end mb-4">
        <Popover
          aria-labelledby="profile-popover"
          content={
            <div className="w-64 p-3">
              <div className="mb-2  items-center justify-between">
                <input
                  type="text"
                  placeholder="Enter food name"
                  className="p-2 border border-gray-300 rounded w-full mb-4"
                  value={newFoodName}
                  onChange={(e) => setNewFoodName(e.target.value)}
                />
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
                  onClick={() => {
                    createMenu();
                    handleAddFood();
                    alert("Menu Added successfully");
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          }
        >
          <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">
            Create New Menu
          </button>
        </Popover>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Admin Menu Management
      </h2>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-100 text-left">
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Menu Name</th>
              <th className="px-4 py-2">Price (MMK)</th>
              <th className="px-4 py-2">Month</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No menus added yet
                </td>
              </tr>
            ) : (
              foodMonthCreate?.map((menu, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{menu.food_name}</td>
                  <td className="px-4 py-2">
                    {parseFloat(menu.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">{menu.date}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 mr-2 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          {editIndex !== null ? "Edit Menu" : "Add New Menu"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 w-full mb-6">
            <div className="mb-6">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Select Price
              </label>
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    {...field}
                    id="price"
                    className="p-2 focus:outline-none focus:ring focus:ring-sky-300 rounded w-full"
                    required
                  >
                    <option value="">Select Price</option>
                    {[...Array(10)].map((_, i) => {
                      const price = (i + 1) * 1000;
                      return (
                        <option key={price} value={price}>
                          {price}
                        </option>
                      );
                    })}
                  </select>
                )}
              />
            </div>
          </div>


          <div className="bg-gray-100 rounded-xl shadow-md p-6 border border-gray-100 w-full mb-6">
            {fields.map((item, index) => (
              <div key={item.id} className="grid md:grid-cols-2 gap-6 mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-200">

                {/* Food Menu */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Food Menu
                  </label>
                  <Controller
                    name={`menus.${index}.food_name`}
                    control={control}
                    rules={{ required: "Please select at least one food item" }}
                    render={({ field }) => (
                      <MultiSelect
                        {...field}
                        value={field.value || []}
                        options={foodLists}
                        optionLabel="name"
                        placeholder="Select food items"
                        className="w-full"
                      />
                    )}
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <Controller
                    name={`menus.${index}.created_at`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <input
                        type="date"
                        className="p-2 focus:outline-none focus:ring focus:ring-sky-300 rounded w-full"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                </div>

                {/* Remove Button */}
                <div className="col-span-2 text-right">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

          </div>




          <div className="md:col-span-3" >
            <button
              type="button"
              onClick={() => append({ food_name: [], created_at: "" })}
              className="mb-4 mr-3 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 mb-2"
            >
              Add New Menu
            </button>

            <button
              type="submit"
              className="mt-2 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
            >
              {editIndex !== null ? "Update Menu" : "Add Menu"}
            </button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default Menu;
