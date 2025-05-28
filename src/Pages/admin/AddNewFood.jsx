// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MultiSelect } from 'primereact/multiselect';

// const AddNewFood = ({ setFoodOptions }) => {
//   const [newFoodName, setNewFoodName] = useState('');
//   const navigate = useNavigate(); // Hook to navigate between pages

//   const handleAddFood = () => {
//     if (!newFoodName.trim()) {
//       alert('Please enter a valid food name.');
//       return;
//     }

//     const newFood = {
//       name: newFoodName.trim(),
//       food_id: `food_${Date.now()}`,
//     };

//     setFoodOptions((prev) => [...prev, newFood]); // Add new food to the shared state
//     setNewFoodName('');
//   };

//   const handleExit = () => {
//     navigate('/menu'); // Navigate back to the Menu page
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Menu</h2>

//       {/* Add New Food Form */}
//       <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
//         <h3 className="text-lg font-semibold mb-3">Add a New Item</h3>
//         <div className="flex gap-4 items-center">
//           <input
//             type="text"
//             placeholder="Enter food name"
//             className="p-2 border border-gray-300 rounded w-full"
//             value={newFoodName}
//             onChange={(e) => setNewFoodName(e.target.value)}
//           />
//           <button
//             type="button"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             onClick={handleAddFood}
//           >
//             Add
//           </button>
//         </div>
//       </div>

//       {/* Exit Button */}
//       <div className="mt-6">
//         <button
//           type="button"
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           onClick={handleExit}
//         >
//           Exit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddNewFood;