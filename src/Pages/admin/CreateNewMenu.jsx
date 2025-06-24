import React, { useState } from "react";
import { Popover } from "flowbite-react";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CreateNewMenu = () => {
  const [newFoodName, setNewFoodName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      toast.success("Food item created successfully!");
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || "Upload failed!";
      if (errorMessage === "This curry already exists") {
        toast.error(errorMessage);
      } else {
        toast.error("Failed to create food item.");
      }
    },
  });

  const createMenu = async () => {
    const food = { name: newFoodName.trim() };
    return mutation.mutateAsync({
      endpoint: "/food/create",
      method: "POST",
      body: food,
    });
  };

  const handleAddFood = () => {
    if (!newFoodName.trim()) {
      toast.error("Please enter a valid food name.");
      return;
    }

    setNewFoodName("");
  };

  return (
    <div className="flex justify-end mb-4">
      <Popover
        content={
          <div className="w-64 p-3">
            <input
              type="text"
              placeholder="Enter food name"
              className="p-2 border border-gray-300 rounded w-full mb-4"
              value={newFoodName}
              onChange={(e) => setNewFoodName(e.target.value)}
            />
            <button
              className=" text-white px-4 py-2 rounded  w-full bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
              onClick={async () => {
                if (!newFoodName.trim()) {
                  toast.error("Please enter a valid food name.");
                  return;
                }

                try {
                  await createMenu(); // only show toast in onSuccess
                  handleAddFood(); // clear input
                } catch (err) {
                  // error is already handled in onError
                }
              }}
            >
              Create
            </button>
          </div>
        }
      >
        <button className= "text-white px-4 py-2 rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400">
          Create New Menu
        </button>
      </Popover>
    </div>
  );
};

export default CreateNewMenu;
