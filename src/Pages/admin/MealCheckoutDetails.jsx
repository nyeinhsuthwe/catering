import React, { useState, useMemo } from 'react';
import { useApiQuery } from '../../hooks/useQuery'; // Adjust if needed
import Datatable from 'react-data-table-component';

const MealCheckoutDetails = ({ empId, onBack }) => {
  const { data, isLoading, error } = useApiQuery(
    {
      endpoint: "/attendance/list-admin",
      queryKey: ["attendance"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const [filters, setFilters] = useState({
    status: '',
    date: '',
    checkOut: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = useMemo(() => {
    if (!data?.data) return [];

    const selectedEmployee = data.data.find(emp => emp.emp_id === empId);
    if (!selectedEmployee) return [];

    return selectedEmployee.attendances
      .filter((att) => {
        const matchStatus = filters.status ? att.status === filters.status : true;
        const matchDate = filters.date ? att.date === filters.date : true;
        const matchCheckOut =
          filters.checkOut !== ''
            ? String(att.check_out) === filters.checkOut
            : true;
        return matchStatus && matchDate && matchCheckOut;
      })
      .map((att, idx) => ({
        id: idx + 1,
        emp_id: selectedEmployee.emp_id,
        emp_name: selectedEmployee.emp_name,
        emp_email: selectedEmployee.emp_email,
        total_amount: selectedEmployee.total_amount,
        ...att,
      }));
  }, [data, filters, empId]);

  const columns = [
    { name: 'Emp ID', selector: row => row.emp_id, sortable: true },
    { name: 'Name', selector: row => row.emp_name, sortable: true },
    { name: 'Email', selector: row => row.emp_email },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Food', selector: row => row.food_name },
    { name: 'Price', selector: row => row.price },
    { name: 'Status', selector: row => row.status, sortable: true },
    { name: 'Check Out', selector: row => String(row.check_out) },
    { name: 'Total Amount', selector: row => row.total_amount },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading attendance data.</p>;

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        ← Back to List
      </button>

      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          name="status"
          className="border p-2 rounded"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
        <input
          type="date"
          name="date"
          className="border p-2 rounded"
          value={filters.date}
          onChange={handleChange}
        />
        <select
          name="checkOut"
          className="border p-2 rounded"
          value={filters.checkOut}
          onChange={handleChange}
        >
          <option value="">All Checkout</option>
          <option value="true">Checked Out</option>
          <option value="false">Not Checked Out</option>
        </select>
      </div>

      {/* Data Table */}
      <Datatable
        title="Filtered Attendance"
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        pointerOnHover
        responsive
        striped
      />
    </div>
  );
};

export default MealCheckoutDetails;
