import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useApiMutation } from "../../hooks/useMutation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const Holiday = () => {
  const { handleSubmit, setValue } = useForm();
  const [fileBase64, setFileBase64] = useState(null);
  const [fileName, setFileName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useApiMutation({
    onSuccess: (data) => {
      console.log("Upload successful:", data);
      toast.success("Holiday file imported successfully!");
      queryClient.invalidateQueries({ queryKey: ["holiday"] });
    },
    onError: (error) => {
      console.error("Upload failed:", error?.response?.data || error.message);
      const msg = error?.response?.data?.message || "Upload failed. Please try again.";
      toast.error(msg);
    },
  });

  const onSubmit = () => {
    if (!fileBase64 || !fileName) {
      toast.error("Please select a valid Excel file to upload.");
      return;
    }

    toast("Uploading holiday file...");

    mutation.mutate({
      endpoint: "/holiday/import-base64",
      method: "POST",
      body: {
        filename: fileName,
        file_base64: fileBase64,
      },
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      setFileBase64(base64);
      setValue("file_base64", base64);
      setValue("filename", file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 dark:bg-gray-700 bg-white dark:text-white">Upload Holiday File</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div id="fileUpload" className="max-w-md mb-4">
          <Label className="mb-2 block " htmlFor="file">
            Upload Holiday File (.xls, .xlsx)
          </Label>
          <FileInput
            id="file"
            type="file"
            onChange={handleFileUpload}
            accept=".xls,.xlsx"
          />
        </div>

        <div className="justify-end mb-4">
          <button
            type="submit"
            className="  px-4 py-2 rounded text-white  bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400" 
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      
    </div>
  );
};

export default Holiday;
