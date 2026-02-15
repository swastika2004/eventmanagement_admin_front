import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Reducer/AuthSlice"
import CategorySlice from "../Reducer/CategorySlice"
import EventSlice from "../Reducer/EventSlice"
const store=configureStore({
    reducer:{
        auth:AuthSlice,
       category:CategorySlice,
       event:EventSlice
    }
})
export default store