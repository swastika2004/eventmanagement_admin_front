import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Store/Api";

/* ================= FETCH EVENTS ================= */
export const fetchEvents = createAsyncThunk(
  "event/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/event/getAllEvent");

      if (response?.data?.status_code === 200) {
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

export const fetchSingleEvents = createAsyncThunk(
  "event/fetchSingleEvents",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await api.get(`/event/getSingleEvent/${id}`);

      if (response?.data?.status_code === 200) {
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
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post("/event/createEvent", userInput);

      if (response?.data?.status_code === 201||response?.data?.status_code === 200) {
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
      const response = await api.put(`/event/${id}`, data);

      if (response?.data?.status_code === 200) {
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
      const response = await api.delete(`/event/${id}`);

      if (response?.data?.status_code === 200) {
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
  eventList: [],
  createEventData:"",
  singleEventData:{}
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
      .addCase(addEvent.pending,(state)=>{
        state.loading=true
      })
      .addCase(addEvent.fulfilled, (state, { payload }) => {
        state.loading=false
        state.createEventData=payload
      })
      .addCase(addEvent.rejected,(state,{payload})=>{
        state.loading=false
        state.error=payload
      })
      .addCase(fetchSingleEvents.pending,(state)=>{
        state.loading=true
      })
      .addCase(fetchSingleEvents.fulfilled, (state, { payload }) => {
        state.loading=false
        state.singleEventData=payload
      })
      .addCase(fetchSingleEvents.rejected,(state,{payload})=>{
        state.loading=false
        state.error=payload
      })

      /* UPDATE */
    
});

export default EventSlice.reducer;
