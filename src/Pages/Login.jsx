import React, { useState } from "react";
import { Card, Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useApiMutation } from "../hooks/useMutation";
import { userStore } from "../store/userStore";
import Cookies from "js-cookie";
import { role } from "../hooks/role";
import toast from "react-hot-toast";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setUser, setToken } = userStore();
  const [loading, setLoading] = useState(false);

  const mutation = useApiMutation({
    onSuccess: (res) => {
      console.log(res);
      toast.success("successfully logged in");
      if (res) {
        const { token, employee } = res.data.data;
        Cookies.set("token", token);
        setUser(employee);
        setToken(token);
        navigate(role[employee.role || "/login"]);
      }
    },
    onError: (err) => {
      console.error("Login failed:", err.response?.data || err.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    mutation.mutate({
      endpoint: "login",
      method: "POST",
      body: { ...data },
    });
  };

  return (
    <div>
      <h3 className="text-3xl font-bold mt-23 text-gray-500 text-center">
        Login Form
      </h3>
      <Card className="max-w-md mt-6 mx-auto bg-gray-100">
        <div className="items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex mx-auto mt-6 mb-6 max-w-md flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="employeeId" className="text-gray-600">
                  Your ID
                </Label>
              </div>

              <TextInput
                {...register("employeeId")}
                id="employeeId"
                placeholder="Enter your ID"
                type="text"
                required
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" className="text-gray-600">
                  Your password
                </Label>
              </div>
              <TextInput
                {...register("password")}
                id="password"
                placeholder="Enter your password"
                type="password"
                required
                shadow
              />
            </div>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white" />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>

          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
