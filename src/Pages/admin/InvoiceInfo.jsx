import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useApiQuery } from '../../hooks/useQuery';
import { Link } from 'react-router-dom';

const InvoiceInfo = () => {
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
            name: 'Action',
            cell: row => (
                <Link to="/admin/invoiceInfo/sendInvoice"
                    state={{
                        emp_id: row.emp_id,
                        emp_name: row.emp_name,
                        emp_email: row.emp_email,
                    }}
                >
                    <button
                        className="text-yellow-400 hover:underline"

                    >
                        View Details
                    </button>
                </Link>
            ),
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
                customStyles={{
                    headCells: {
                        style: {
                            fontSize: "15px",
                            fontWeight: "bold",
                            backgroundColor: "#f3f4f6",
                        },
                    },
                }}
            />
        </div>
    );
};

export default InvoiceInfo;
