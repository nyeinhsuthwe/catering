import React, { useEffect } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { userStore } from "../../store/userStore";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useApiMutation } from "../../hooks/useMutation";

const Profile = () => {
  const { user, setUser } = userStore();
  const { handleSubmit, register, setValue } = useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const editMutation = useApiMutation({
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["edit"],
      });

      setUser({
        ...user,
        name: variables.body.name,
        email: variables.body.email,
      });

      toast.success("Successfully Updated!");
    },
    onError: (error) => {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        console.error("Validation errors:", errors);

        Object.values(errors).forEach((msgArr) =>
          toast.error(msgArr.join(", "))
        );
      } else {
        toast.error("Something went wrong!");
        console.error(error);
      }
    },
  });

  const onSubmit = (data) => {
    editMutation.mutate({
      endpoint: `employees/${user.employeeId}`,
      method: "PUT",
      body: {
        name: data.name,
        email: data.email,
      },
    });
  };

  return (
    <div>
      <p className="dark:text-yellow-500 mx-auto text-yellow-400 max-w-lg text-2xl mb-4 font-bold mt-[80px]">
        Edit Your Info
      </p>

      <Card className="max-w-lg mx-auto">
        <form
          className="flex mx-auto flex-col gap-4 w-100 mt-4 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="id">Your ID</Label>
            </div>
            <TextInput id="id" value={user.employeeId} disabled />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="role">Your Role</Label>
            </div>
            <TextInput id="role" type="text" value={user.role} disabled />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">Your Name</Label>
            </div>
            <TextInput id="name" type="text" {...register("name")} />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email">Your Email</Label>
            </div>
            <TextInput id="email" type="text" {...register("email")} />
          </div>

          <Button
            className="w-[200px] bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400 mt-4"
            type="submit"
          >
            <i className="fa-solid fa-check me-2"></i> Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
