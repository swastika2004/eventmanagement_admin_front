import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Reducer/AuthSlice"
import CategorySlice from "../Reducer/CategorySlice"
const store=configureStore({
    reducer:{
        auth:AuthSlice,
       category:CategorySlice
    }
})
export default store