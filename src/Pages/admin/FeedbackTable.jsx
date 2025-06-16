import React from 'react';
import { useApiQuery } from '../../hooks/useQuery';
import DataTable from 'react-data-table-component';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const FeedbackTable = () => {
  const { data: feedbackData = [] } = useApiQuery(
    {
      endpoint: "/feedback/list",
      queryKey: ["feedback"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employee Feedback Records</h2>
        <Button onClick={() => navigate('/')}>← Back to Chart</Button>
      </div>

      <DataTable
        columns={[
          { name: "ID", selector: (row) => row.emp_id, sortable: true },
          { name: "Employee Name", selector: (row) => row.emp_name, sortable: true },
          { name: "Feedback", selector: (row) => row.text },
          { name: "Rating", selector: (row) => row.rating, sortable: true },
          { name: "Date", selector: (row) => row.updated_at, sortable: true }
        ]}
        data={feedbackData}
        pagination
        highlightOnHover
        striped
        noDataComponent="No feedback available"
      />
    </div>
  );
};

export default FeedbackTable;
