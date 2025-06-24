import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useApiQuery } from '../../hooks/useQuery';
import { useApiMutation } from '../../hooks/useMutation';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const InvoiceInfo = () => {
    const queryClient = useQueryClient();
    const [filterName, setFilterName] = useState("");

    const { data: invoiceData = [], isLoading } = useApiQuery(
        {
            endpoint: "/invoices",
            queryKey: ["invoice"],
            method: "GET",
            onError: (error) => {
                console.error("Error fetching invoices:", error);
            },
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    const mutation = useApiMutation({
        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ["invoice"] });
        },
        onError: (error) => {
            // toast.success("Invoice sent successfully!");
            const errorMessage = error?.response?.data?.message || "Sending failed!";
            // toast.error(errorMessage);
        },
    });

    const handleSendEmail = async (row) => {
        try {
            await mutation.mutateAsync({
                endpoint: `/send-invoice/${row.emp_id}`,
                method: "POST",
                body: { message: "Your Invoice Email Content" },
            });
        } catch (err) {
            toast.success("Invoice sent successfully!");
            console.error("Failed to send invoice:", err);
        }
    };

    const columns = [
        {
            name: 'No.',
            selector: (row, index) => index + 1,
            width: '60px',
        },
        {
            name: 'Employee ID',
            selector: row => row.emp_id || '-',
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.emp_name || '-',
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.emp_email || '-',
            sortable: true,
        },
        {
            name: 'Total Amount (MMK)',
            selector: row => `${parseFloat(row.total_amount || 0).toLocaleString()} MMK`,
            sortable: true,
            right: true,
        },
        {
            name: 'Action',
            cell: row => (
                <button
                    className="text-blue-600 cursor-pointer"
                    onClick={() => handleSendEmail(row)}
                >
                    Send Invoice
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const groupData = Array.from(
        new Map(invoiceData.map(item => [item.emp_id, item])).values()
    );

    const filteredData = groupData.filter(item =>
        item.emp_name?.toLowerCase().includes(filterName.toLowerCase())
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Employee Invoices</h2>

             {/* Filter by Name */}
          <div className="w-full md:w-1/3 mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Name
            </label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Enter name..."
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
           

            <DataTable
                columns={columns}
                data={filteredData}
                progressPending={isLoading}
                pagination
                highlightOnHover
                defaultSortFieldId={1}
            />
        </div>
    );
};

export default InvoiceInfo;
