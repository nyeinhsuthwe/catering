import React, { useState, useRef } from 'react';
import { FileInput, Label } from "flowbite-react";
import { useApiMutation } from "../../hooks/useMutation";
import { useApiQuery } from "../../hooks/useQuery";
import { useQueryClient } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import DataTable from 'react-data-table-component';
import { toast } from "react-hot-toast";
import Holiday from './Holiday';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";




const AdminAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const queryClient = useQueryClient();


  const [announcement, setAnnouncement] = useState({
    date: "",
    text: ""
  });
  const mutation = useApiMutation({

    onSuccess: (data) => {
      toast.success("Announcement created successfully!");
      console.log("successful:", data);
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      // Reset form
      setAnnouncement({ date: '', text: '', title: '' });
      setInput('');
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(
        error?.response?.data?.message || "Update failed. Please try again."
      );
    },
  });

  const createAnnouncement = async () => {

    mutation.mutate({
      endpoint: "/announcement/create",
      method: "POST",
      body: {
        date: announcement.date,
        text: announcement.text,
        title: announcement.title,
      }

    });
  };


  const { data: announce } = useApiQuery(
    {
      endpoint: "/announcement/list",
      queryKey: ["announcements"],
      method: "GET",
      onSuccess: (data) => {
        setAnnouncements(data);
      },
      onError: (error) => {
        console.error("Error fetching announcements:", error);
      },
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const deleteMutation = useApiMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] })
      toast.success("successfully deleted!");

    },
    onError: (error) => {
      console.error(
        "Delete failed:",
        error?.response?.data?.message || error.message
      );
    },
  });
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;
    deleteMutation.mutate({
      endpoint: `announcement/destroy/${id}`,
      method: "DELETE",
    });

    console.log(`Deleting MenuList at: announcement/destroy/${id}`);

  };

  const columns = [
    { name: "ID", selector: row => row.id, sortable: true },
    { name: "Date", selector: row => row.date, sortable: true },
    { name: "Title", selector: row => row.title, sortable: true },
    { name: "Description", selector: row => row.text, sortable: true },


    {
      name: "Actions",
      cell: (row, index) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => {
              setAnnouncement({
                id: row.id,
                date: row.date,
                text: row.text,
                title: row.title,
              });
              setEditIndex(index);
            }}
          >
            <i class="fas fa-edit text-blue-600 cursor-pointer ml-4"></i>

          </button>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => {
              handleDelete(row.id);


              console.log("Delete announcement:", row.id);
            }}
          >
            <i className="fa-solid fa-trash text-red-500 cursor-pointer ml-2"></i>

          </button>
        </div>
      ),
    },
  ]

  //For Updating Announcement
  const updateMutation = useApiMutation({
    onSuccess: (data) => {
      toast.success("Announcement updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      setAnnouncement({ date: "", text: "", title: "" });
      setEditIndex(null);
    },
    onError: (error) => {
      toast.error("Failed to update announcement.");
      console.error("Update failed:", error);
    },
  });

  const updateAnnouncement = () => {
    if (editIndex === null) return; // No edit in progress

    updateMutation.mutate({
      endpoint: `/announcement/update/${announcement.id}`,
      method: "PUT",
      body: {
        date: announcement.date,
        text: announcement.text,
        title: announcement.title,
      },
    });
  };


  return (
    <div className="p-6 rounded-lg shadow-sm text-gray-700 dark:bg-gray-700 bg-white dark:text-white">


      <div className="max-w-md mb-2 ">
        <Label className="mb-2 block" htmlFor="date">
          Select Announcement Date
        </Label>
        <input
          id="date"
          type="date"
          className="p-2 border rounded w-full text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
          value={announcement.date}
          onChange={(e) =>
            setAnnouncement({ ...announcement, date: e.target.value })
          }
        />
        <input
          type="text"
          className="p-2 border rounded w-full mt-2 text-gray-800 dark:bg-gray-800 bg-white dark:text-white"
          placeholder="Enter announcement title"
          value={announcement.title}
          onChange={(e) =>
            setAnnouncement({ ...announcement, title: e.target.value })
          }
        />

      </div>


      <div className="max-w-md mb-2">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {editIndex !== null ? 'Edit Announcement' : 'New Announcement'}
        </label>
        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your announcement here..."

          value={announcement.text}
          onChange={(e) =>
            setAnnouncement({ ...announcement, text: e.target.value })
          }
        ></textarea>
        <button

          className="mt-2 px-4 py-2  text-white rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
          onClick={() => {
            if (editIndex !== null) {
              updateAnnouncement();
            } else {
              createAnnouncement();

            }
          }
          }
        >
          {editIndex !== null ? 'Update' : 'Add'}
        </button>

        <button
          className="mt-2 ml-2 px-4 py-2 text-white rounded bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400"
          onClick={() => {
            setAnnouncement({ date: "", text: "", title: "" });
            setEditIndex(null);
          }}
        >
          Cancel
        </button>



      </div>
        <div className="overflow-x-auto bg-white text-gray-700 dark:bg-gray-800 dark:text-white p-4 rounded">
          <Table striped>
            <TableHead>
              <TableHeadCell>ID</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
             
            </TableHead>
            <TableBody className="divide-y">
              {(announce || []).map((row, index) => (
                <TableRow
                  key={row.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 border-0"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.text}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setAnnouncement({
                            id: row.id,
                            date: row.date,
                            text: row.text,
                            title: row.title,
                          });
                          setEditIndex(index);
                        }}
                      >
                        <i className="fas fa-edit text-blue-600 cursor-pointer ml-4"></i>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(row.id)}
                      >
                        <i className="fa-solid fa-trash text-red-500 cursor-pointer ml-2"></i>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

     
      <Holiday />


    </div>
  );
};

export default AdminAnnouncement;
