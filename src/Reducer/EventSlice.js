import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Store/Api";

/* ================= FETCH EVENTS ================= */
export const fetchEvents = createAsyncThunk(
  "event/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/events/getAllEvent");

      if (response?.data?.status_code === 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

/* ================= ADD EVENT ================= */
export const addEvent = createAsyncThunk(
  "event/add",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/event", data);

      if (response?.data?.status_code === 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

/* ================= UPDATE EVENT ================= */
export const updateEvent = createAsyncThunk(
  "event/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(/event/${id}, data);

      if (response?.data?.status_code === 201) {
        return response.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

/* ================= DELETE EVENT ================= */
export const deleteEvent = createAsyncThunk(
  "event/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(/event/${id});

      if (response?.data?.status_code === 201) {
        return id;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  eventList: []
};
const EventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      /* FETCH */
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(fetchEvents.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.eventList = payload;
      })
      .addCase(fetchEvents.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      /* ADD */
      .addCase(addEvents.fulfilled, (state, { payload }) => {
        state.eventList.push(payload?.data);
      })

      /* UPDATE */
      .addCase(updateEvent.fulfilled, (state, { payload }) => { 
        const updated = payload?.data;
        state.eventList = state.eventList.map((event) =>
          event._id === updated._id ? updated : event
        );
      })

      /* DELETE */
      .addCase(deleteEvent.fulfilled, (state, { payload }) => {
        state.eventList = state.eventList.filter(
          (event) => event._id !== payload
        );
      })
});

export default EventSlice.reducer;
