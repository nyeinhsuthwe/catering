// import React from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import { Card, Button } from "flowbite-react";
// import { useApiQuery } from "../../hooks/useQuery";
// import { Link } from "react-router-dom";

// const COLORS = ['#FF6666', '#FFB266', '#FFFF66', '#99FF99', '#66B3FF'];

// const RatingPieChart = () => {
//   const { data: feedbacks = [] } = useApiQuery(
//     {
//       endpoint: "/feedback/list",
//       queryKey: ["feedback"],
//     },
//     {
//       refetchOnWindowFocus: false,
//     }
//   );

//   const ratingCounts = feedbacks.reduce((acc, curr) => {
//     const roundedRating = Math.round(curr.rating);
//     acc[roundedRating] = (acc[roundedRating] || 0) + 1;
//     return acc;
//   }, {});

//   const total = feedbacks.length;

//   const chartData = Object.entries(ratingCounts).map(([rating, count]) => ({
//     name: `${rating} Star${rating > 1 ? 's' : ''}`,
//     value: count,
//   }));

//   const ratingPercentages = Object.entries(ratingCounts)
//     .sort((a, b) => b[0] - a[0])
//     .map(([rating, count]) => ({
//       rating,
//       count,
//       percent: ((count / total) * 100).toFixed(1)
//     }));

//   const renderStars = (num) => '★'.repeat(num) + '☆'.repeat(5 - num);

//   return (
//     <Card className="w-full">
//       <div className="flex justify-between items-center mt-2">

//         <h5 className="text-xl font-bold tracking-tight text-gray-700 dark:text-white text-center mb-6">
//           Employee Satisfaction Over Time
//         </h5>
//         <Link to="feedbackTable">
//           <Button className='bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400'>Details</Button>
//         </Link>
//       </div>

//       <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
//         {/* Pie Chart */}
//         <div className="flex-1 flex justify-center">
//           <PieChart width={300} height={250}>
//             <Pie
//               data={chartData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={90}
//               label
//             >
//               {chartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip
//               contentStyle={{ backgroundColor: '#333', borderRadius: '8px', color: '#fff', border: 'none' }}
//               labelStyle={{ color: '#fff', fontWeight: 'bold' }}
//               itemStyle={{ color: '#fff' }}
//             />            <Legend verticalAlign="bottom" />
//           </PieChart>
//         </div>

//         {/* Star Rating Breakdown */}
//         <div className="flex-1">
//           <h5 className="text-lg font-semibold text-gray-800 mb-4">Star Rating Breakdown</h5>
//           <ul className="space-y-3">
//             {ratingPercentages.map(({ rating, count, percent }) => (
//               <li key={rating} className="flex items-center gap-4">
//                 <span className="text-yellow-500 font-semibold w-24 text-lg">
//                   {renderStars(Number(rating))}
//                 </span>
//                 <span className="text-gray-700 dark:text-white">{count} reviews</span>
//                 <span className="ml-auto font-semibold text-gray-700 dark:text-white">{percent}%</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </Card>

//   );
// };

// export default RatingPieChart;

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, Button } from "flowbite-react";
import { useApiQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import { Underline } from "lucide-react";

const COLORS = ["#FF6666", "#FFB266", "#FFFF66", "#99FF99", "#66B3FF"];

const FeedbackBarChart = () => {
  const { data: feedbacks = [] } = useApiQuery(
    {
      endpoint: "/feedback/list",
      queryKey: ["feedback"],
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Count ratings
  const ratingCounts = feedbacks.reduce((acc, curr) => {
    const rounded = Math.round(curr.rating);
    acc[rounded] = (acc[rounded] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(ratingCounts)
    .sort((a, b) => a[0] - b[0]) // 1 → 5
    .map(([rating, count]) => ({
      rating: `${rating} ★`,
      count,
    }));

  return (
    <Card className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold tracking-tight text-gray-700 dark:text-white">
          Employee Feedback & Satisfaction
        </h3>
        <Link to="/admin/feedbackTable">
          <Button className="bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-500 dark:hover:bg-yellow-400">
            Details
          </Button>
        </Link>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="rating" label={{ value: "Ratings", angle: 0 }} />
            <YAxis
              allowDecimals={false}
              label={{
                value: "Employee",
                angle: -90,
                position: "center",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                borderRadius: "8px",
                color: "#fff",
                border: "none",
              }}
              labelStyle={{ color: "#fff", fontWeight: "bold" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default FeedbackBarChart;
