import React, { useState } from 'react';
import { useApiQuery } from '../../hooks/useQuery';
import {  Card, Button } from 'flowbite-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import FeedbackTable from './FeedbackTable'; // adjust path as needed

const FeedbackRecord = () => {
  const { data: feedbackData = [] } = useApiQuery(
    {
      endpoint: "/feedback/list",
      queryKey: ["feedback"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const [showDetails, setShowDetails] = useState(false);

  // Format data for line chart
  const chartData = feedbackData.map(item => ({
    date: new Date(item.updated_at).toLocaleDateString(),
    rating: item.rating,
  }));
  const navigate = useNavigate();

  return (
    <Card>
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Employee Satisfaction Over Time</h2>
        <Link to="feedbackTable">
        <Button className='bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400'>Details</Button>
        </Link>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {showDetails && (
        <div className="mt-6 mb-4">
          <FeedbackTable feedbackData={feedbackData} />
        </div>
      )}
    </Card>
  );
};

export default FeedbackRecord;
