// import Sidebar from "../Sidebar"

// const Dashboard=()=>{
//     return(
//         <>
//         {/* <Sidebar/> */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//        <div className="bg-white p-6 rounded-2xl shadow">
//          <h3 className="text-gray-500">Total Users</h3>
//          <p className="text-3xl font-bold mt-2">120</p>
//        </div>
//        <div className="bg-white p-6 rounded-2xl shadow">
//                  <h3 className="text-gray-500">Total Categories</h3>

//         <p className="text-3xl font-bold mt-2">12</p>

//       </div>

//       <div className="bg-white p-6 rounded-2xl shadow">

//         <h3 className="text-gray-500">Total Events</h3>

//         <p className="text-3xl font-bold mt-2">45</p>

//       </div>

//     </div>
//         </>
//     )
// }
// export default Dashboard


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardSummary } from "../../Reducer/BookingSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { summary, loading } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  const cards = [
    { title: "Total Bookings", value: summary.totalBookings, color: "text-blue-600" },
    { title: "Confirmed", value: summary.confirmedBookings, color: "text-green-600" },
    { title: "Cancelled", value: summary.cancelledBookings, color: "text-red-600" },
    { title: "Attended", value: summary.attendedBookings, color: "text-purple-600" },
    { title: "Total Revenue", value: `₹${summary.totalRevenue}`, color: "text-yellow-600" },
    { title: "Tickets Sold", value: summary.totalTicketsSold, color: "text-indigo-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-sm text-gray-500">Real-time stats for your event management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{card.title}</h3>
            <p className={`text-3xl font-bold mt-2 ${card.color}`}>
              {loading ? "..." : card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Legacy/Placeholder cards for Users/Events if needed, or just combine them */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Users</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800">120</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Categories</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Events</h3>
          <p className="text-3xl font-bold mt-2 text-gray-800">45</p>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
