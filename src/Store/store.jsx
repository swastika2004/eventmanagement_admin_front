import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Reducer/AuthSlice"
const store=configureStore({
    reducer:{
        auth:AuthSlice
    }
})
export default store