import React, { useState } from 'react';
import Datatable from 'react-data-table-component';
import MenuOrderPie from './MenuOrderPie';

const ViewEmpOrderDetail = ({ data, empId, onBack }) => {
    const [selectedMonth, setSelectedMonth] = useState('');

    // All orders for selected employee
    const empOrders = data.filter(d => d.emp_id === empId);

    // Filter by selected month if provided
    const detailData = selectedMonth
        ? empOrders.filter(order => {
            const orderDate = new Date(order.date);
            const month = String(orderDate.getMonth() + 1).padStart(2, '0');
            const year = orderDate.getFullYear();
            return `${year}-${month}` === selectedMonth;
        })
        : empOrders;

    const detailColumns = [
        {
            name: 'No.',
            selector: (row, index) => index + 1,
        },
        {
            name: 'Employee ID',
            selector: row => row.emp_id,
            sortable: true,
        },
        {
            name: 'Employee Name',
            selector: row => row.emp_name,
            sortable: true,
        },
        {
            name: 'Food Name',
            selector: row => row.food_name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => row.date,
            sortable: true,
        },
    ];

    const totalAmount = detailData.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

    return (
        <div className="mt-6">
            <button onClick={onBack} className="mb-4 text-red-500 hover:underline">
                ← Back to List
            </button>
            <h2 className="text-xl font-semibold mb-4">Details for Employee ID: {empId}</h2>


            {/* Month Filter */}
            <div className="mb-4">
                <label className="block mb-1 font-medium">Filter by Month</label>
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                />
            </div>

            <Datatable
                columns={detailColumns}
                data={detailData}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 15, 20, 25]}
                customStyles={{
                    headCells: {
                        style: {
                            fontSize: '15px',
                            fontWeight: 'bold',
                            backgroundColor: '#f3f4f6',
                        },
                    },
                }}
            />

            <div className="mt-4 text-right font-semibold text-lg">
                Total Amount: <span className="text-green-600">{totalAmount}</span>
            </div>

            {/* Optionally show Pie Chart for filtered data */}
            {/* <MenuOrderPie detailData={detailData} /> */}
        </div>
    );
};

export default ViewEmpOrderDetail;
