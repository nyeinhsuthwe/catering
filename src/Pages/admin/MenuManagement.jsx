// import React, { useState } from "react";
// import { Popover } from "flowbite-react";
// import { MultiSelect } from "primereact/multiselect";
// import { useApiMutation } from "../../hooks/useMutation";
// import { useQueryClient } from "@tanstack/react-query";
// import { useApiQuery } from "../../hooks/useQuery";
// import useMenuStore from "../../store/menuStore";
// import { Controller, useForm, useFieldArray } from "react-hook-form";
// import toast from "react-hot-toast";
// import DataTable from "react-data-table-component"; //added for table

// const Menu = () => {
//   const [menus, setMenus] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [newFoodName, setNewFoodName] = useState("");
//   const [searchText, setSearchText] = useState(""); //Added searchText state
//   const queryClient = useQueryClient();

//   const { menuLists, setMenuLists } = useMenuStore();


//   // Create a new food item
//   const mutation = useApiMutation({
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["foods"] });
//     },
//     onError: (error) => {
//       console.error("Upload failed:", error);
//     },
//   });
//   const createMenu = async () => {
//     const food = { name: newFoodName.trim() };
//     mutation.mutate({
//       endpoint: "/food/create",
//       method: "POST",
//       body: food,
//     });
//   };

//   // Fetch food lists to show in multiselect
//   const { data: foodLists } = useApiQuery(
//     {
//       endpoint: "/food/list",
//       queryKey: ["foods"],
//     },
//     {
//       refetchOnWindowFocus: false,
//     }
//   );

//   // Fetch food month data to show in the table
//   const { data: foodMonthCreate } = useApiQuery(
//     {
//       endpoint: "/foodmonth/list",
//       queryKey: ["foodmonthprice"],
//     },
//     {
//       onSuccess: (data) => { },
//     }
//   );

//   const { register, handleSubmit, control, reset } = useForm({
//     defaultValues: {
//       menus: [{ food_name: [], created_at: "" }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "menus",
//   });



//   //edit menu price and date to update
//   const updateMenuMutation = useApiMutation({
//     onSuccess: () => {
//       toast.success("Menu updated successfully!");
//       queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
//     },
//   });

//   // Mutation for creating or updating menu items
//   const menuListMutation = useApiMutation({
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
//     },
//     onError: (error) => {
//       console.error("Upload failed:", error);
//     },
//   });







//   const onSubmit = (data) => {
//     // toast.loading("Updating Menu");
//     if (!data.price || !data.menus || data.menus.length === 0) {
//       toast.dismiss();
//       alert("Please fill all fields.");
//       return;
//     }

//     const newMenus = data.menus.flatMap((menu) =>
//       menu.food_name.map((food) => ({
//         food_name: typeof food === "string" ? food : food.name,
//         price: data.price,
//         date: menu.created_at,
//       }))
//     );

//     if (editIndex !== null) {
//       const menuToEdit = foodMonthCreate[editIndex];

//       updateMenuMutation.mutate({
//         endpoint: `/foodmonth/update/${menuToEdit.date}`, // Or ID if preferred
//         method: "PUT", 
//         body: {
//           items: newMenus,
//           price: data.price,

//         },
//       },
//         {
//           onSuccess: () => {
//             toast.dismiss(); // Remove loading toast
//             toast.success("Menu updated successfully!");
//             queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
//           },
//           onError: (error) => {
//             toast.dismiss();
//             toast.error(
//               error?.response?.data?.message || "Update failed. Please try again."
//             );
//           },
//         },
//       );
//       console.log("Updating with:", newMenus);

//     } else {
//       // If not editing, use your existing create mutation
//       menuListMutation.mutate({
//         endpoint: "/foodmonth/create",
//         method: "POST",
//         body: {
//           items: newMenus,
//           price: data.price,
//         },
//       },
//         {
//           onSuccess: () => {
//             toast.dismiss();
//             toast.success("Menu created successfully!");
//             queryClient.invalidateQueries({ queryKey: ["foodmonthprice"] });
//           },
//           onError: (error) => {
//             toast.dismiss();
//             toast.error(
//               error?.response?.data?.message || "Creation failed. Please try again."
//             );
//           },
//         },
//       );
//     }
//   };



//   const handleAddFood = () => {
//     if (!newFoodName.trim()) {
//       alert("Please enter a valid food name.");
//       return;
//     }

//     const newFood = {
//       name: newFoodName.trim(),
//       food_id: `food_${Date.now()}`,
//     };

//     setNewFoodName("");
//   };

//   const updateMutation = useApiMutation({
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['foodmonthprice'] })
//       toast.success("successfully updated!");


//     },
//     onError: (error) => {
//       console.error(
//         "Update failed:",
//         error?.response?.data?.message || error.message
//       );
//     },
//   });
//   const handleEdit = (selectedMenu) => {
//     const foodArray = Array.isArray(selectedMenu.food_items)
//       ? selectedMenu.food_items.map((item) =>
//         typeof item === "string" ? { name: item } : item
//       )
//       : typeof selectedMenu.food_items === "string"
//         ? selectedMenu.food_items.split(",").map((item) => ({ name: item.trim() }))
//         : [];

//     reset({
//       price: selectedMenu.price,
//       menus: [
//         {
//           food_name: foodArray, // <-- this must match what MultiSelect expects
//           created_at: selectedMenu.date,
//         },
//       ],
//     });

//     setEditIndex(selectedMenu.id);
//   };








//   const deleteMutation = useApiMutation({
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['foodmonthprice'] })
//       toast.success("successfully deleted!");

//     },
//     onError: (error) => {
//       console.error(
//         "Delete failed:",
//         error?.response?.data?.message || error.message
//       );
//     },
//   });


//   const handleDelete = (date) => {
//     const confirmed = window.confirm("Are you sure you want to delete?");
//     if (!confirmed) return;
//     deleteMutation.mutate({
//       endpoint: `foodmonth/destroy/${date}`,
//       method: "DELETE",
//     });

//     console.log(`Deleting MenuList at: foodmonth/destroy/${date}`);

//   };

//   // Filter the data based on searchText
//   const filteredData = (foodMonthCreate || []).filter((item) =>
//     item.food_name.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const columns = [
//     {
//       name: "No.",
//       selector: (row, index) => index + 1,
//       width: "70px",
//     },
//     {
//       name: "Menu Name",
//       selector: (row) => row.food_name,
//       sortable: true,
//     },
//     {
//       name: "Price (MMK)",
//       selector: (row) => parseFloat(row.price).toFixed(2),
//       sortable: true,

//     },
//     {
//       name: "Month",
//       selector: (row) => row.date,
//     },
//     {
//       name: "Actions",
//       cell: (row, index) => (
//         <div className="space-x-2">
//           <button
//             onClick={() => handleEdit(row)}
//             className=" hover:text-blue-800"
//           >



//             <i class="fas fa-edit text-blue-600 cursor-pointer ml-4"></i>
//           </button>
//           <button
//             onClick={() => handleDelete(row.date)}
//             className=""
//           >
//             <i className="fa-solid fa-trash text-red-500 cursor-pointer ml-2"></i>
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="max-w-5xl mx-auto">
//       <div className="flex justify-end mb-4">
//         <Popover
//           content={
//             <div className="w-64 p-3">
//               <input
//                 type="text"
//                 placeholder="Enter food name"
//                 className="p-2 border border-gray-300 rounded w-full mb-4"
//                 value={newFoodName}
//                 onChange={(e) => setNewFoodName(e.target.value)}
//               />
//               <button
//                 className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 w-full"
//                 onClick={() => {
//                   createMenu();
//                   handleAddFood();
//                   toast.success("Food item created successfully!");
//                 }}
//               >
//                 Create
//               </button>
//             </div>
//           }
//         >
//           <button className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">
//             Create New Menu
//           </button>
//         </Popover>
//       </div>

//       <h2 className="text-2xl font-bold text-gray-800 mb-6">
//         Admin Menu Management
//       </h2>

//       {/* Added Search Bar here */}
//       <div className="p-6 bg-white rounded-lg shadow-md mb-6">
//         <div className="mb-4">
//           <div class="flex items-center mb-4">
//             <div class="relative">
//               <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                   <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                 </svg>
//               </div>
//               <input type="search"
//                 id="default-search"
//                 value={searchText}
//                 onChange={(e) => setSearchText(e.target.value)}
//                 class="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Search orders..." required />
//             </div>
//           </div>

//           <DataTable
//             title="Menu Lists"
//             columns={columns}
//             data={filteredData}
//             pagination
//             highlightOnHover
//             striped
//             responsive
//             noDataComponent="No menu items found"
//             customStyles={{
//               headCells: {
//                 style: {
//                   fontSize: "15px",
//                   fontWeight: "bold",
//                   backgroundColor: "#f3f4f6",
//                 },
//               },
//               cells: {
//                 style: {
//                   paddingLeft: "8px",
//                   paddingRight: "8px",
//                 },
//               },
//             }}


//           />
//         </div>
//       </div>


//       <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//         <h3 className="text-lg font-semibold mb-4">
//           {editIndex !== null ? "Edit Menu" : "Add New Menu"}
//         </h3>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 w-full mb-6">
//             <div className="mb-6">
//               <label
//                 htmlFor="price"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Enter Price
//               </label>
//               {/* Changed price input to simple text input using register */}
//               <input
//                 {...register("price", { required: "Price is required" })}
//                 type="text"
//                 id="price"
//                 placeholder="Enter price"
//                 className="p-2 focus:outline-none focus:ring focus:ring-sky-300 rounded w-full"
//               />
//             </div>
//           </div>

//           <div className="bg-gray-100 rounded-xl shadow-md p-6 border border-gray-100 w-full mb-6">
//             {fields.map((item, index) => (
//               <div
//                 key={item.id}
//                 className="grid md:grid-cols-2 gap-6 mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-200"
//               >
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Select Food Menu
//                   </label>
//                   <Controller
//                     control={control}
//                     name={`menus.${index}.food_name`}
//                     render={({ field }) => (
//                       <MultiSelect
//                         value={field.value}
//                         options={foodLists}
//                         onChange={(e) => field.onChange(e.value)}
//                         optionLabel="name"
//                         placeholder="Select Food"
//                         className="w-full md:w-20rem"
//                         display="chip"
//                       />
//                     )}
//                   />


//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Select Date
//                   </label>
//                   <Controller
//                     name={`menus.${index}.created_at`}
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }) => (
//                       <input
//                         type="date"
//                         className="p-2 focus:outline-none focus:ring focus:ring-sky-300 rounded w-full"
//                         value={field.value || ""}
//                         onChange={(e) => field.onChange(e.target.value)}
//                       />
//                     )}
//                   />
//                 </div>

//                 <div className="col-span-2 text-right">
//                   <button
//                     type="button"
//                     onClick={() => remove(index)}
//                     className="text-red-600 hover:underline text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <button
//               type="button"
//               onClick={() => append({ food_name: [], created_at: "" })}
//               className="mb-4 mr-3 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 mb-2"
//             >
//               Add
//             </button>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="mt-2 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
//             >
//               {editIndex !== null ? "Update Menu" : "Add Menu"}
//             </button>



//             <button
//               type="button"
//               onClick={() => {
//                 reset();
//                 setEditIndex(null);
//               }}
//               className="mt-2 ml-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
//             >
//               Cancel Edit
//             </button>


//           </div>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default Menu;
