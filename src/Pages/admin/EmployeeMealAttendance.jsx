import React from 'react'
import { useApiQuery } from "../../hooks/useQuery";
import Datatable from 'react-data-table-component'

const EmployeeMealAttendance = () => {
    const { data } = useApiQuery(
        {
          endpoint: "/attendance/list",
          queryKey: ["attendance"],
        },
        {
          refetchOnWindowFocus: false,
        }
      );
      console.log("Fetched Data:", data);
      const columns = [
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
          name: 'Order Date',
          selector: row => row.date,
          sortable: true,
        }
      ];
  return (
    <div>
      <Datatable
        title="Employee Attendance"
        columns={columns}
        data={data || []} // <-- this line is crucial
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20, 25]}
      />
    </div>
  )
}

export default EmployeeMealAttendance
