import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiQuery } from "../../hooks/useQuery";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

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

  const { register, handleSubmit, control, reset } = useForm({
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

    menuListMutation.mutate({
      endpoint: "/foodmonth/create",
      method: "POST",
      body: {
        items: newMenus,
        price: data.price,
      },
    }, {
      onSuccess: () => {
        toast.dismiss();
        toast.success("Menu created successfully!");
        reset();
      },
      onError: (error) => {
        toast.dismiss();
        toast.error(
          error?.response?.data?.message || "Creation failed. Please try again."
        );
      },
    });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Add New Menu</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 w-full mb-6">
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Price
            </label>
            <input
              {...register("price", { required: "Price is required" })}
              type="text"
              id="price"
              placeholder="Enter price"
              className="p-2 focus:outline-none focus:ring focus:ring-sky-300 rounded w-full"
            />
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl shadow-md p-6 border border-gray-100 w-full mb-6">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid md:grid-cols-2 gap-6 mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-200"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Food Menu
                </label>
                <Controller
                  control={control}
                  name={`menus.${index}.food_name`}
                  render={({ field }) => (
                    <MultiSelect
                      value={field.value}
                      options={foodLists}
                      onChange={(e) => field.onChange(e.value)}
                      optionLabel="name"
                      placeholder="Select Food"
                      className="w-full md:w-20rem"
                      display="chip"
                    />
                  )}
                />
              </div>

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
  );
};

export default AddNewMenu;
