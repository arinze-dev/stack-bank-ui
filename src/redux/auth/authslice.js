import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {config} from "../../utils/config"
config.config()
const  URL = `${config.API_URL}user`
// Register thunk    
export const Register = createAsyncThunk("auth/Register", async(userdata, thunkApi)=>{
    try {
      const respo = await axios.post(URL+"register",userdata)    
      return respo.data        
    } catch (error) {
      let message = (error.response && error.response.data && error.response.data.message) || error.response.data
     return thunkApi.rejectWithValue(message)
    }

})


//  login Thunk
export const LoginThunk = createAsyncThunk("auth/LoginThunk", async(user, thunkApi)=>{
    try {
      const respo = await axios.post(URL+"login",user)    
      return respo.data        
    } catch (error) {
      let message = (error.response && error.response.data && error.response.data.message) || error.response.data
     return thunkApi.rejectWithValue(message)
    }
})


const initialState = {
  status:"",
  user:"",
  error: "",
}
   
const authslice = createSlice({
    name:"auth",
    initialState,
    reducers: {
         Reset:(state)=>{
            state.status = ""
            state.user = ""
            state.userRegister = ""
            state.error = ""
         }},
    extraReducers:(builder)=>{
        builder.addCase(Register.pending, (state,) => {
            state.status= "Pending"
        }).addCase(Register.fulfilled,(state,action)=>{
            state.status = "Fulfilled"
            state.error = ""
            state.userRegister  = action.payload
        }).addCase(Register.rejected,(state,action)=>{
            state.status = "Rejected"
            state.userRegister = ""
            state.error = action.payload
        }).addCase(LoginThunk.pending,(state)=>{               
            state.status= "Pending"
        }).addCase(LoginThunk.fulfilled,(state,action)=>{
            state.status = "Fulfilled"
            state.error = ""
            state.user = action.payload
        }).addCase(LoginThunk.rejected,(state,action)=>{
            state.status = "Rejected"
            state.user = ""
            state.error = action.payload
        })
    }
})

export const {Reset}= authslice.actions
export const selectRegistered = (state)=> state.auth

export const selectlogedin = (state)=> state.auth 
export default authslice 