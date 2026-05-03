import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBookings, updateBookingStatus } from "../../Reducer/BookingSlice";

const BookingList = () => {
  const dispatch = useDispatch();
  const { bookings, loading, totalPages, currentPage } = useSelector((state) => state.booking);
  
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllBookings({ status: statusFilter, page }));
  }, [dispatch, statusFilter, page]);

  const handleStatusChange = (id, newStatus) => {
    if (window.confirm(`Are you sure you want to change status to ${newStatus}?`)) {
      dispatch(updateBookingStatus({ id, status: newStatus }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
          <p className="text-sm text-gray-500">Manage and track all event bookings</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <select 
            className="border border-gray-300 p-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="attended">Attended</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">#</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Booking ID</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">User Details</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Event Info</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Tickets</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Total Price</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Booking Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && bookings.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-10 text-gray-500">Loading bookings...</td>
              </tr>
            ) : bookings?.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-10 text-gray-500">No bookings found</td>
              </tr>
            ) : (
              bookings?.map((booking, index) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">{(page - 1) * 10 + index + 1}</td>
                  <td className="px-4 py-4 font-mono text-xs text-blue-600 cursor-help" title={booking._id}>
                    {booking._id.substring(0, 8)}...
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">{booking.userId?.fullName || 'N/A'}</div>
                    <div className="text-gray-500 text-xs">{booking.userId?.email || 'N/A'}</div>
                    <div className="text-gray-400 text-[10px]">{booking.userId?.phoneNumber || ''}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">{booking.eventId?.eventName || 'N/A'}</div>
                    <div className="text-gray-500 text-xs">{booking.eventId?.venue || 'N/A'}</div>
                    <div className="text-gray-400 text-[10px]">{booking.eventId?.location || ''}</div>
                  </td>
                  <td className="px-4 py-4 font-semibold text-center">{booking.numberOfTickets}</td>
                  <td className="px-4 py-4 font-bold text-gray-800">₹{booking.totalAmount}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold tracking-wider
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                        'bg-blue-100 text-blue-700'}`}>
                      {booking.status?.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-600">
                    {new Date(booking.bookingDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <select 
                      className="border border-gray-300 rounded p-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    >
                      <option value="confirmed">Confirm</option>
                      <option value="cancelled">Cancel</option>
                      <option value="attended">Attended</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm font-medium gap-4">
          <p className="text-gray-500">
            Showing page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2 w-full sm:w-auto justify-center">
            <button 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto"
            >
              Previous
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;
