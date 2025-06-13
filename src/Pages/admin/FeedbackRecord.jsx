import React from 'react'
import { useApiQuery } from '../../hooks/useQuery';
import { Card } from 'flowbite-react';
import DataTable from 'react-data-table-component';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';
const FeedbackRecord = () => {
    const { data: feedbackData } = useApiQuery(
        {
            endpoint: "/feedback/list",
            queryKey: ["feedback"],
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    // Format data for line chart
    const chartData = feedbackData.map(item => ({
        date: new Date(item.updated_at).toLocaleDateString(),
        rating: item.rating,
    }));
    return (
        <Card>
            <h2 className="text-xl font-semibold mb-4">Employee Satisfaction Over Time</h2>
            
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis label={{ value: 'Ratings', angle: -90, position: 'center' }} domain={[0, 5]} allowDecimals={false} />
                        
                        <Tooltip />
                        <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* <hr className="my-6" /> //This is Line */}
            <DataTable
                title="Employee Feedback"
                columns={[
                    { name: "ID", selector: (row) => row.emp_id, sortable: true },
                    { name: "Employee Name", selector: (row) => row.emp_name, sortable: true },
                    { name: "Feedback", selector: (row) => row.text },
                    { name: "Rating", selector: (row) => row.rating, sortable: true },
                    { name: "Date", selector: (row) => row.updated_at, sortable: true }
                ]}
                data={feedbackData || []}
                pagination
                highlightOnHover
                striped
                noDataComponent="No feedback available"
            />
        </Card>
    )
}

export default FeedbackRecord
