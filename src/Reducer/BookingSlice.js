import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Store/Api";

/* ================= FETCH ALL BOOKINGS ================= */
export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAll",
  async ({ status, page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/bookings", {
        params: { status, page, limit, search },
      });

      if (response?.data?.success) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

/* ================= UPDATE BOOKING STATUS ================= */
export const updateBookingStatus = createAsyncThunk(
  "booking/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/bookings/${id}/status`, { status });

      if (response?.data?.success) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

/* ================= FETCH DASHBOARD SUMMARY ================= */
export const fetchDashboardSummary = createAsyncThunk(
  "booking/fetchSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/summary");

      if (response?.data?.success) {
        return response.data.summary;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  bookings: [],
  totalBookings: 0,
  currentPage: 1,
  totalPages: 1,
  summary: {
    totalBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    attendedBookings: 0,
    totalRevenue: 0,
    totalTicketsSold: 0,
  },
};

const BookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      /* FETCH ALL BOOKINGS */
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bookings = payload.bookings;
        state.totalBookings = payload.totalBookings;
        state.currentPage = payload.currentPage;
        state.totalPages = payload.totalPages;
      })
      .addCase(fetchAllBookings.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      /* UPDATE BOOKING STATUS */
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBookingStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.bookings.findIndex((b) => b._id === payload.booking._id);
        if (index !== -1) {
          state.bookings[index] = payload.booking;
        }
      })
      .addCase(updateBookingStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      /* DASHBOARD SUMMARY */
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.summary = payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }),
});

export default BookingSlice.reducer;
