import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Reducer/AuthSlice"
import CategorySlice from "../Reducer/CategorySlice"
import EventSlice from "../Reducer/EventSlice"
import BookingSlice from "../Reducer/BookingSlice"
const store=configureStore({
    reducer:{
        auth:AuthSlice,
       category:CategorySlice,
       event:EventSlice,
       booking:BookingSlice
    }
})
export default store