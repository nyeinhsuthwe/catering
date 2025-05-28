import React, { useState, useRef } from 'react';
import { FileInput, Label } from "flowbite-react";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import * as XLSX from "xlsx";


const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const queryClient = useQueryClient();

  
  const [fileBase64, setFileBase64] = useState(null);

  // const fileInputRef = useRef(null);

  // const handleClick = () => {
  //   fileInputRef.current.click();
  // };


  // const handleHolidayFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const base64 = reader.result.split(",")[1];
  //     setFileBase64(base64);
  //     setValue("Holidayfile", base64);
  //   };
  //   reader.readAsDataURL(file);
  // };


  // const mutation = useApiMutation({
  //     onSuccess: (data) => {
  //       console.log("Upload successful:", data);
  //       queryClient.invalidateQueries({ queryKey: ["holiday"] });
  //     },
  //     onError: (error) => {
  //       console.error("Upload failed:", error);
  //     },
  //   });
  //   const onSubmit = (data) => {
  //   mutation.mutate({
  //     endpoint: "/holiday/create",
  //     method: "POST",
  //     body: {
  //       filename: "holiday file",
  //       file_base64: fileBase64,
  //     },
  //   });
  // };

  const [announcement, setAnnouncement] = useState({
    date: "",
    text: ""
  });
  const mutation = useApiMutation({
    onSuccess: (data) => {
      console.log("successful:", data);
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      // Reset form
      setAnnouncement({ date: '', text: '' });
      setInput('');
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  const createAnnouncement = async () => {

    mutation.mutate({
      endpoint: "/announcement/create",
      method: "POST",
      body: {
        date: announcement.date,
        text: announcement.text,
      }

    });
  };



  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">

      <div id="fileUpload" className="max-w-md mb-4">
        <Label className="mb-2 block" htmlFor="file">
          Upload Holiday Announcement File
        </Label>
        <FileInput
          id="file"
          type="file"

          // onChange={handleHolidayFileUpload}
          accept=".xls,.xlsx"
        />
      </div>

      {/* <div className="justify-end mb-4">
        {/* <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Uploading..." : "Upload"}
        </button>
      </div> */}


      <div className="bg-gray-100 rounded-xl shadow-md p-6 border border-gray-100 w-full mb-6">
        <div className="grid md:grid-cols-1 gap-6 mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <div className="max-w-md mb-4">
          <Label className="mb-2 block" htmlFor="date">
            Select Announcement Date
          </Label>
          <input
            id="date"
            type="date"
            className="p-2 border rounded w-full"
            value={announcement.date}
            onChange={(e) =>
              setAnnouncement({ ...announcement, date: e.target.value })
            }
          />
        </div>


        <div className="p-4 max-w-xl mx-auto">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {editIndex !== null ? 'Edit Announcement' : 'New Announcement'}
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your announcement here..."

            value={announcement.text}
            onChange={(e) =>
              setAnnouncement({ ...announcement, text: e.target.value })
            }
          ></textarea>
          <button

            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {
              createAnnouncement();

            }
            }
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </button>


        </div>
      </div>
      </div>
    </div>
  );
};

export default Announcement;
