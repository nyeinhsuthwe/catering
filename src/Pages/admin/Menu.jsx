import React, { useState } from 'react';

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', date: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedMenus = [...menus];
      updatedMenus[editIndex] = form;
      setMenus(updatedMenus);
      setEditIndex(null);
    } else {
      setMenus([...menus, form]);
    }
    setForm({ name: '', price: '', date: '' });
  };

  const handleEdit = (index) => {
    setForm(menus[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this menu?')) {
      setMenus(menus.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Menu Management</h2>

      {/* Menu Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-100 text-left">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Menu Name</th>
              <th className="px-4 py-2">Price ($)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">No menus added yet</td>
              </tr>
            ) : (
              menus.map((menu, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{menu.name}</td>
                  <td className="px-4 py-2">${parseFloat(menu.price).toFixed(2)}</td>
                  <td className="px-4 py-2">{menu.date}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 mr-2 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          {editIndex !== null ? 'Edit Menu' : 'Add New Menu'}
        </h3>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Menu Name"
            className="p-2 bg-white focus:outline-none focus:ring focus:ring-sky-300 rounded"
            required
          />
          <select  name="price" value={form.price}
  onChange={handleChange}
  className="p-2 bg-white focus:outline-none focus:ring focus:ring-sky-300 rounded"
  required
>
  <option value="">Select Price</option>
  {[...Array(10)].map((_, i) => {
    const price = (i + 1) * 1000;
    return (
      <option key={price} value={price}>
        {price}
      </option>
    );
  })}
</select>
          

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="p-2 bg-white focus:outline-none focus:ring focus:ring-sky-300 rounded"
            required
          />
          <div className="md:col-span-3">
            <button type="submit" className="mt-2 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">
              {editIndex !== null ? 'Update Menu' : 'Add Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Menu;
