import React, { useState } from 'react';
import { Button, Popover } from "flowbite-react";
// import FoodMenuLists from 'src/admin/FoodMenuLists'
import { MultiSelect } from 'primereact/multiselect';



const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', month: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation check
    if (!selectedFood || selectedFood.length === 0 || !form.price || !form.month) {
      alert("Please select food(s), price, and month.");
      return;
    }
  
    const newMenus = selectedFood.map((food) => ({
      name: food.name,
      price: form.price,
      month: form.month,
    }));
  
    let updatedMenus = [...menus];
    if (editIndex !== null) {
      // If editing, replace that one entry with the first selectedFood item
      updatedMenus[editIndex] = {
        name: selectedFood[0].name,
        price: form.price,
        month: form.month,
      };
      setEditIndex(null);
    } else {
      updatedMenus = [...menus, ...newMenus];
    }
  
    setMenus(updatedMenus);
    setForm({ name: '', price: '', month: '' });
    setSelectedFood(null);
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


  //Add menu Lists
  const [foodOptions, setFoodOptions] = useState([
    { name: 'Chicken', food_id: 'food_001' },
    { name: 'Pork', food_id: 'food_002' },
    { name: 'Beef', food_id: 'food_003' },
    { name: 'Fish', food_id: 'food_004' },
    { name: 'Sea Food', food_id: 'food_005' },
  ]);

  const [selectedFood, setSelectedFood] = useState(null);
  //for new food names
  const [newFoodName, setNewFoodName] = useState('');
 
      //add new food to multiselect
      const handleAddFood = () => {
        if (!newFoodName.trim()) {
          alert('Please enter a valid food name.');
          return;
        }
      
        const newFood = {
          name: newFoodName.trim(),
          food_id: `food_${Date.now()}`,
        };
      
        setFoodOptions((prev) => [...prev, newFood]); // Add the new food to the options
        setNewFoodName(''); // Clear the input field
      };

  return (


  

    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-end mb-4">
        {/* <Link to='/addnewfood'> */}
        {/* <button
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
          onClick={handleAddNewFood}
        >
          Create New Menu
        </button> */}

      <Popover
      aria-labelledby="profile-popover"
      content={
        <div className="w-64 p-3">
          <div className="mb-2  items-center justify-between">
            <input
          type="text"
          placeholder="Enter food name"
          className="p-2 border border-gray-300 rounded w-full mb-4"
          value={newFoodName}
          onChange={(e) => setNewFoodName(e.target.value)}
        />
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
          onClick={() => {
            handleAddFood();
            alert("Menu Added successfully");
          }}
        >
          Create
        </button>
            </div>
            </div>
           
      }
    >
      <button
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">
          Create New Menu
        </button>
    </Popover>
        {/* </Link> */}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Menu Management</h2>

      {/* Menu Table */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-100 text-left">
            <tr>
              <th className="px-4 py-2">No.</th>
              <th className="px-4 py-2">Menu Name</th>
              <th className="px-4 py-2">Price (MMK)</th>
              <th className="px-4 py-2">Month</th>
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
                  <td className="px-4 py-2">{menu.month}</td>
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
          {/* MultiSelect for Food Menu */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Food Menu
            </label>
            <MultiSelect
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.value)}
              options={foodOptions}
              optionLabel="name"
              placeholder="Select food items"
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Price
            </label>
            <select
              name="price"
              value={form.price}
              onChange={handleChange}
              className="p-2 focus:outline-none focus:ring focus:ring-sky-300 rounded w-full"
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
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Month
            </label>
            <select
              name="month"
              value={form.month}
              onChange={handleChange}
              className="p-2 focus:outline-none focus:ring focus:ring-sky-300 rounded w-full"
              required
            >
              <option value="">Select Month</option>
              {[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="mt-2 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
            >
              {editIndex !== null ? 'Update Menu' : 'Add Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Menu;
