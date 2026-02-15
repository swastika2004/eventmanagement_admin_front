import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../Reducer/EventSlice";


const ManageEvent = () => {
  const dispatch = useDispatch();
  const { eventList, loading, error } = useSelector(
    (state) => state.event
  );




  /* ================= FETCH ON LOAD ================= */
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

 console.log("eventList",eventList);
 
  return (
   <>
   <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Event Management</h2>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
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
    </div>
   </>
  );
};

export default ManageEvent;