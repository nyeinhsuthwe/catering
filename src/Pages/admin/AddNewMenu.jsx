import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { TreeSelect } from "primereact/treeselect";

const AddNewMenu = () => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");

  const { data: foodLists } = useApiQuery(
    {
      endpoint: "/food/list",
      queryKey: ["foods"],
    },
    { refetchOnWindowFocus: false }
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      menus: [{ food_name: [], created_at: "" }],
      price: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menus",
  });

  const menuListMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
    },
    onError: (error) => {
      console.error("Creation error:", error);
    },
  });

  const onSubmit = (data) => {
    if (!data.price || !data.menus.length) {
      alert("Please fill all fields.");
      return;
    }

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
          reset();
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

  return (
    <div className=" p-6 rounded-lg shadow-sm text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
      <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">
        Add New Menu
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" rounded-xl shadow-md p-6 border border-gray-200 w-full mb-6 text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-sm font-medium   mb-2 text-gray-700  dark:text-white"
            >
              Enter Price
            </label>
            <input
              {...register("price", { required: "Price is required" })}
              type="text"
              id="price"
              placeholder="Enter price"
              className="p-2 focus:outline-none focus:ring focus:ring-sky-300 rounded w-full text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        <div className="">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid md:grid-cols-2 gap-6 mb-6 p-4 rounded-xl shadow-md border border-gray-200 text-gray-700 dark:bg-gray-700 bg-white dark:text-white"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Select Food Menu
                </label>
                <Controller
                  control={control}
                  name={`menus.${index}.food_name`}
                  rules={{ required: "Food menu is required" }}
                  render={({ field }) => (
                    <MultiSelect
                      value={field.value}
                      options={foodLists}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      placeholder="Select Food"
                      className=" md:w-20rem rounded w-full text-gray-800 dark:bg-gray-800 bg-white dark:text-white "
                      display="chip"
                    />
                  )}
                />

                {errors.menus?.[index]?.food_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.menus[index].food_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                  Select Date
                </label>
                <Controller
                  name={`menus.${index}.created_at`}
                  rules={{ required: "Date is required" }}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="date"
                      className="p-2 focus:outline-none focus:ring focus:ring-sky-300 rounded w-full text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
                {errors.menus?.[index]?.created_at && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.menus[index].created_at.message}
                  </p>
                )}
              </div>

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

          <button
            type="button"
            onClick={() => append({ food_name: [], created_at: "" })}
            className="mb-4 mr-3  text-white px-4 py-2 rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
          >
            Add
          </button>
        </div>

        <div>
          <button
            type="submit"
            className="mt-2 text-white px-4 py-2 rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
          >
            Add Menu
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="mt-2 ml-2 text-white px-3 py-2 rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
    //Add menu
  );
};

export default AddNewMenu;
