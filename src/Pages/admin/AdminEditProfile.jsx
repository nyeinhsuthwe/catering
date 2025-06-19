import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiMutation } from "../../hooks/useMutation";
import toast from "react-hot-toast";


const AdminEditProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const profile = state?.profile;

  if (!profile) {
    return <div className="p-6 text-red-500">No profile data received.</div>;
  }

  const [formData, setFormData] = useState({
    name: profile.name || "",
    email: profile.email || "",
    emp_id: profile.emp_id || "",
    role: profile.role || "",
  });

  const updateMutation = useApiMutation({
    method: "PUT",
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      navigate("/admin/adminProfile");
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
      endpoint: `/employees/${formData.emp_id}`,
      method: "PUT",
      body: {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        emp_id: formData.emp_id,
      },
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-sky-700">Edit Admin Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded shadow">
        <div>
          <label className="block text-sm text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Employee ID</label>
          <input
            type="text"
            name="emp_id"
            value={formData.emp_id}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded"
          disabled={updateMutation.isLoading}
        >
          {updateMutation.isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AdminEditProfile;
