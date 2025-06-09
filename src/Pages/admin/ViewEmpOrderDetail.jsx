import React from 'react'
import Datatable from 'react-data-table-component'

const ViewEmpOrderDetail = ({ data, empId, onBack }) => {


    const detailData = data.filter(d => d.emp_id === empId);
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
        }
    ];
    

    return (
        
            
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Details for Employee ID: {empId}</h2>
                    <button onClick={onBack} className="mb-4 text-red-500 hover:underline">
                        ← Back to List 
                    </button>          
                    <Datatable
                        columns={detailColumns}
                        data={detailData} // <-- this line is crucial
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 15, 20, 25]}
                    />

                </div>
            
        
    )
}

export default ViewEmpOrderDetail
