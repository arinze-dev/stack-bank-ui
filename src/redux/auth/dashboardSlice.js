import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {getUserInfo} from "../../auth/authIndex"

const  URL = `${process.env.REACT_APP_API_URL}/user`

const initialState = {
    status:"",
    data:"",
    error:""
 }
  



export const dashDoardThunnk = createAsyncThunk("dashdoard/dashDoardSlice", async(_,thunkApi)=>{
    let token = await getUserInfo().token 
    const config = {
        headers:{
            token:token
        }
    }
    
    try {
      const respo = await axios.get(URL,config)
          return respo.data
    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.response.data
        return thunkApi.rejectWithValue(message)
    }
})


 const dashDoardSlice = createSlice({
    name: "dashdoard",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(dashDoardThunnk.pending,(state)=>{
            state.status ="pending"
        }).addCase(dashDoardThunnk.fulfilled,(state,action)=>{
          state.status = "fulfilled"
          state.data =action.payload
        }).addCase(dashDoardThunnk.rejected,(state,action)=>{
            state.status = "rejected"
            state.data =""
            state.error = action.payload
        })
    }
})


export default dashDoardSlice

export const selectDashBoard = (state)=> state.dashdoard


