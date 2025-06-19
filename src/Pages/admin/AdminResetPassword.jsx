import React, { useState } from "react";
import { useApiMutation } from "../../hooks/useMutation";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
export default function AdminResetPassword() {
  const { state } = useLocation();
  const profile = state?.profile;


  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const mutation = useApiMutation({
    method: "PUT",
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to change password.");
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    mutation.mutate({
      endpoint: "/employeesPsw/${formData.emp_id}", // Change to your API endpoint
      method: "PUT",
      body: {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
      },
    });
  };
  console.log("Changing password for employee id:", formData.emp_id);


  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-sky-700">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-600">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
