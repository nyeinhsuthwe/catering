
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Label,
  TextInput,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { userStore } from "../../store/userStore";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useApiMutation } from "../../hooks/useMutation";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminResetPassword = () => {
  const { handleSubmit, register, reset } = useForm();
  const { user, logout } = userStore();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const changePasswordMutation = useApiMutation({
    onSuccess: () => {
      setOpenModal(true);
      toast.success("Password updated successfully!");
      reset();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data) => {
    if (data.new_password !== data.confirm_password) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    changePasswordMutation.mutate({
      endpoint: `/employeesPsw/${user.employeeId}`,
      method: "PUT",
      body: {
      old_password: data.oldPassword,
      new_password: data.newPassword,
      confirm_password: data.confirmPassword,
    },
    });
};

const handleStay = () => setOpenModal(false);
const handleLogout = () => {
  setOpenModal(false);
  Cookie.remove("token");
  logout();
  navigate("/login");
};

return (
  <div className="">
    <Modal show={openModal} size="md" onClose={handleStay} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Your password has been changed. Do you want to stay logged in or
            log out?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={handleLogout}>
              Log Out
            </Button>
            <Button color="alternative" onClick={handleStay}>
              Stay Logged In
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>

    <p className="mx-auto dark:text-blue-500 text-blue-400 max-w-lg  text-2xl mb-4 font-bold  mt-[80px]">
      Change Your Password
    </p>

    <Card className="max-w-lg mx-auto">
      <form
        className="flex mx-auto flex-col gap-4 w-100 mt-4 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Old Password</Label>
          </div>
          <TextInput
            placeholder="enter your current password ..."
            id="oldPassword"
            type="password"
            {...register("oldPassword")}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">New Password</Label>
          </div>
          <TextInput
            placeholder="enter your new password ..."
            id="newPassword"
            type="password"
            {...register("newPassword")}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Confirm Password</Label>
          </div>
          <TextInput
            placeholder="confirm your password ..."
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
        </div>
        <div className="flex items-center gap-4">
        <Button
          className="mt-3 w-[200px] bg-sky-600 hover:bg-sky-700"
          type="submit"
        >
          <i className="fa-solid fa-check me-2"></i> Submit
        </Button>
        <button
          type="button"
          onClick={() => navigate("/admin/adminProfile")}
          className="mt-3 bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded"
        >
          Cancel 
        </button>
        </div>
      </form>
    </Card>
  </div>
);
};

export default AdminResetPassword;
