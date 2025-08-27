import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { MultiSelect } from "primereact/multiselect";
import { useApiQuery } from "../../hooks/useQuery";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MenuUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedMenu = location.state;

  const queryClient = useQueryClient();

  const { data: foodLists } = useApiQuery(
    {
      endpoint: "/food/list",
      queryKey: ["foods"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { control, register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      price: "",
      menus: [{ food_name: [], created_at: "" }],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "menus",
  });

  const updateMenuMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
      navigate("/admin/menu");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed.");
    },
  });

  useEffect(() => {
    if (selectedMenu) {
      setValue("price", selectedMenu?.price?.toString());

      const mappedMenus = selectedMenu?.menus?.map((menuItem) => ({
        created_at: menuItem.date,
        food_name: menuItem.items.map((item) => {
          const found = foodLists?.find((f) => f.name === item.food_name);
          return found || { name: item.food_name };
        }),
      }));

      if (mappedMenus?.length > 0) {
        reset({
          price: selectedMenu?.price?.toString() || "",
          menus: mappedMenus,
        });
      }
    }
  }, [selectedMenu, foodLists, setValue, reset]);

  const onSubmit = (data) => {
    if (!data.price || !data.menus.length) {
      toast.error("Please fill all required fields");
      return;
    }

    const updatedMenus = data.menus.flatMap((menu) =>
      menu.food_name.map((food) => ({
        food_name: typeof food === "string" ? food : food.name,
        price: parseFloat(data.price),
        date: menu.created_at,
      }))
    );

    let successCount = 0;
    let failCount = 0;

    updatedMenus.forEach((menu) => {
      updateMenuMutation.mutate(
        {
          endpoint: `/foodmonth/update/${menu.date}`,
          method: "PUT",
          body: {
            food_name: menu.food_name,
            price: menu.price,
            date: menu.date,
          },
        },
        {
          onSuccess: () => {
            successCount++;
            if (successCount + failCount === updatedMenus.length) {
              toast.success("All menus updated successfully!");
              navigate("/admin/menu");
            }
          },
          onError: (error) => {
            failCount++;
            console.error("Update failed:", error);
            toast.error(
              error?.response?.data?.message ||
                `Failed to update menu for ${menu.date}`
            );
          },
        }
      );
    });
  };

  return (
    <div className=" p-6 rounded-lg shadow-sm text-gray-800 dark:bg-gray-800 bg-white dark:text-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">
        Edit Menu
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Price</label>
          <input
            type="text"
            {...register("price", { required: true })}
            className="w-full p-2 border border-gray-300 rounded text-gray-700 dark:text-white bg-white dark:bg-gray-700 "
            placeholder="Enter price"
          />
        </div>

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border p-4 rounded-lg text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
          >
            <div>
              <label className="block mb-1 text-sm font-medium">
                Select Food
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
                    display="chip"
                    className="w-full text-gray-700 dark:bg-gray-700 bg-white dark:text-white "
                    placeholder="Select food items"
                  />
                )}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Date</label>
              <Controller
                control={control}
                name={`menus.${index}.created_at`}
                render={({ field }) => (
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded text-gray-700 dark:bg-gray-700 bg-white dark:text-white"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="col-span-2 text-right">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ food_name: [], created_at: "" })}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 mb-4"
        >
          Add Another Menu
        </button>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 "
          >
            Update Menu
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/menu")}
            className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuUpdate;
