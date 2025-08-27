import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiMutation } from "../../hooks/useMutation";
import toast from "react-hot-toast";
import { userStore } from "../../store/userStore";


const AdminEditProfile = () => {
  const navigate = useNavigate();
  const { user } = userStore();
  const empId = user.employeeId;

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    emp_id: user.employeeId || "",
    role: user.role || "",
  });

  const updateMutation = useApiMutation({
    method: "PUT",
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      navigate("/admin/adminProfile", { state: { updated: true } });
    },
    onError: (error) => {
      const errData = error?.response?.data;
      if (errData?.message) toast.error(errData.message);
      else toast.error("Failed to update profile.");
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

    updateMutation.mutate({
      endpoint: `/employees/${empId}`,
      method: "PUT",
      body: {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        emp_id: formData.employeeId,
      },
    });
  };

  //Edit Profile
  return (
    <div className="p-6 max-w-3xl mx-auto ">
      <h2 className="text-xl font-bold mb-6 text-gray-700  dark:text-white">Edit Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded shadow text-gray-700 dark:bg-gray-700 bg-white dark:text-white">
        <div>
          <label className="block text-sm text-gray-700 dark:text-white">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:bg-gray-700 bg-white dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:bg-gray-700 bg-white dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-white">Employee ID</label>
          <input
            type="text"
            name="emp_id"
            value={formData.emp_id}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 dark:bg-gray-700 bg-white dark:text-white"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-white">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="" >Select Role</option>
            <option value="admin" >Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
        <button
          type="submit"
          className="  text-white px-6 py-2 rounded bg-yellow-400  dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
          disabled={updateMutation.isLoading}
        >
          {updateMutation.isLoading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin/adminProfile")}
          className=" text-white px-6 py-2 rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
        >
          Cancel 
        </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProfile;
