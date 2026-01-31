import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Store/Api";

export const login = createAsyncThunk(
  "login",
  async (user_input, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", user_input);

      if (response?.data?.status_code === 200) {
        return response.data;
      } else {
        
        return rejectWithValue(
          response?.data
        );
      }
    } catch (error) {
      // 👇
      return rejectWithValue(
        error?.response || error.message
      );
    }
  }
);
const initialState={
    loading:false,
    error:false,
    loginData:{}
}
const AuthSlice=createSlice(
    {
        name:"auth",
        initialState,
        reducers:{
            logout: (state) => {
                sessionStorage.removeItem('event_token')
                localStorage.clear()

            }
        },
        extraReducers:(builder)=>
            builder.addCase(login.pending,(state)=>{
                state.loading=true
            })
            .addCase(login.fulfilled,(state,{payload})=>{
                state.loading=false
            
                
                state.loginData=payload?.token
                sessionStorage.setItem("event_token",JSON.stringify({token:payload?.token}))
            })
            .addCase(login.rejected,(state,{payload})=>{
                state.loading=false
                state.error=payload
            })
    }
)
export const{logout}=AuthSlice.actions
export default AuthSlice.reducer;