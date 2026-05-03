import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEvent } from "../../Reducer/EventSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ManageEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventList, loading, error } = useSelector(
    (state) => state.event
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);




  /* ================= FETCH ON LOAD ================= */
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

 console.log("eventList",eventList);


 const handleaddEvent=()=>{
  navigate("/add-event")
 }
  const handleEdit=(id)=>{
  navigate(`/edit-event`,{state:{id:id}})
 }

 const openDeleteModal = (id) => {
   setSelectedEventId(id);
   setShowDeleteModal(true);
 };

 const closeDeleteModal = () => {
   setShowDeleteModal(false);
   setSelectedEventId(null);
 };

 const handleDelete = async () => {
   if (selectedEventId) {
     const res = await dispatch(deleteEvent(selectedEventId));
     console.log("res",res);
     
     if (res.meta.requestStatus === "fulfilled") {
       toast.success("Event deleted successfully");
       closeDeleteModal();
     } else {
       toast.error("Failed to delete event");
     }
   }
 };

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
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
    <h2 className="text-xl font-semibold">Event Management</h2>

    <button
      onClick={handleaddEvent}
      className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 w-full sm:w-auto"
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
            <td className="p-3">
              {cat.imageUrl ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}${cat.imageUrl}`}
                  alt={cat.eventName}
                  className="w-16 h-10 object-cover rounded shadow-sm border border-gray-200"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=No+Image";
                  }}
                />
              ) : (
                <span className="text-gray-400 italic">No Image</span>
              )}
            </td>

            <td className="p-3">{cat.status}</td>
            <td className="p-3">{cat.createdBy}</td>
            <td className="p-3">{cat.createdAt}</td>
            <td className="p-3">{cat.updatedAt}</td>

            <td className="p-3 space-x-2 whitespace-nowrap">
              <button onClick={()=>handleEdit(cat?._id)} className="px-3 py-1 bg-blue-500 text-white rounded">
                Edit
              </button>
              <button
                onClick={() => openDeleteModal(cat?._id)}
                className="px-3 py-1 bg-red-500 text-white rounded transition-colors hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    </div>

    {/* Confirmation Modal */}
    {showDeleteModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full m-4 transform transition-all animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Event?</h3>
          <p className="text-gray-500 text-center mb-8">
            Are you sure you want to delete this event? This action cannot be undone and will permanently remove the event.
          </p>
          <div className="flex gap-4">
            <button
              onClick={closeDeleteModal}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
   </>
  );
};

export default ManageEvent;