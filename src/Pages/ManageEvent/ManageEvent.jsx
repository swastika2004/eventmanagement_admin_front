import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../Reducer/EventSlice";
import { useNavigate } from "react-router-dom";


const ManageEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventList, loading, error } = useSelector(
    (state) => state.event
  );




  /* ================= FETCH ON LOAD ================= */
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

 console.log("eventList",eventList);


 const handleaddEvent=()=>{
  navigate("/add-event")
 }
  return (
   <>
   {/* <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Event Management</h2>
        <button onClick={()=>{handleaddEvent()}} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
          Add Events
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-6">#</th>
            <th className="text-left py-6">Event Name</th>
             <th className="text-left py-6">Event Description</th>
             <th className="text-left py-6">Event Category</th>
             <th className="text-left py-6">Event Date</th>
             <th className="text-left py-6">Event Venue</th>
             <th className="text-left py-6">Event Location</th>
             <th className="text-left py-6">Event Total Seats</th>
             <th className="text-left py-6">Event Total Available Seats</th>
             <th className="text-left py-6">Event Price</th>
             <th className="text-left py-6">Event Image URL</th>
             <th className="text-left py-6">Event Status</th>
             <th className="text-left py-6">Event Created By</th>
             <th className="text-left py-6">Event Created At</th>
             <th className="text-left py-6">Event Updated At</th>
            <th className="text-left py-6">Actions</th>
             
          </tr>
        </thead>
        <tbody>
          {eventList?.events?.map((cat, index) => (
            <tr key={cat.id} className="border-b last:border-none">
              <td className="py-6">{index + 1}</td>
              <td className="py-6">{cat.eventName}</td>
               <td className="py-6">{cat.description}</td>
               <td className="py">{cat?.category}</td>
              <td className="py-2 space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}

    <div className="bg-white p-6 rounded-2xl shadow">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">Event Management</h2>

    <button
      onClick={handleaddEvent}
      className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
    >
      Add Events
    </button>
  </div>

  {/* ✅ scroll container */}
  <div className="overflow-x-auto">
    <table className="min-w-[1400px] w-full border-collapse text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">#</th>
          <th className="p-3 text-left">Event Name</th>
          <th className="p-3 text-left">Description</th>
          <th className="p-3 text-left">Category</th>
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-left">Venue</th>
          <th className="p-3 text-left">Location</th>
          <th className="p-3 text-left">Total Seats</th>
          <th className="p-3 text-left">Available Seats</th>
          <th className="p-3 text-left">Price</th>
          <th className="p-3 text-left">Image</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Created By</th>
          <th className="p-3 text-left">Created At</th>
          <th className="p-3 text-left">Updated At</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {eventList?.events?.map((cat, index) => (
          <tr key={cat._id} className="border-b">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{cat.eventName}</td>
            <td className="p-3 max-w-[200px] break-words">
              {cat.description}
            </td>
            <td className="p-3">{cat?.category?.categoryName}</td>
            <td className="p-3">{cat.eventDate}</td>
            <td className="p-3">{cat.venue}</td>
            <td className="p-3">{cat.location}</td>
            <td className="p-3">{cat.totalSeats}</td>
            <td className="p-3">{cat.availableSeats}</td>
            <td className="p-3">{cat.price}</td>
            <td className="p-3">{cat.image}</td>
            <td className="p-3">{cat.status}</td>
            <td className="p-3">{cat.createdBy}</td>
            <td className="p-3">{cat.createdAt}</td>
            <td className="p-3">{cat.updatedAt}</td>

            <td className="p-3 space-x-2 whitespace-nowrap">
              <button className="px-3 py-1 bg-blue-500 text-white rounded">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
   </>
  );
};

export default ManageEvent;