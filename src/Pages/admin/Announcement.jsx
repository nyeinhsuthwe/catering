import React, { useState, useRef } from 'react';
import { FileInput, Label } from "flowbite-react";



const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [input, setInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);


    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    
    const handleHolidayFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setFileBase64(base64);
      setValue("Holidayfile", base64);
    };
    reader.readAsDataURL(file);
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
                        onChange={handleHolidayFileUpload}
                        accept=".xls,.xlsx"
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
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <button
                    
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>

                
            </div>
        </div>
    );
};

export default Announcement;
