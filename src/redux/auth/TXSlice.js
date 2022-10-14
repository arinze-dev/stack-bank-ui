
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {getUserInfo} from "../../auth/authIndex"
import Loan from "../../components/loan/loan"

const  URL = `${process.env.REACT_APP_API_URL}/tx/`

const initialState = {
    status:"",
    data:{},
    error:""
 }
  
// const config = {
//     headers:{
//         token:token,
//         SecUSerInfo: SecUSerInfo,
//     }
// }

export const PreTransferThunk = createAsyncThunk("Transfers/PreTransferThunk", async(AccNumber,thunkApi)=>{
    let token = await getUserInfo()?.token
    let SecUSerInfo = await getUserInfo()?.SecUSerInfo 
const config = {
    headers:{
        token:token,
        SecUSerInfo: SecUSerInfo,
    }
}  
    try {
        let respo = await axios.post(URL+"pretransfer",AccNumber,config);
        return respo.data
    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.response.data
        return thunkApi.rejectWithValue(message)
    }
})

export const TransferThunk = createAsyncThunk("Transfers/TransferThunk", async(userdata,thunkApi)=>{
    console.log(userdata);
    let token = await getUserInfo()?.token

    let SecUSerInfo = await getUserInfo()?.SecUSerInfo
    
const config = {
    headers:{
        token:token,
        SecUSerInfo: SecUSerInfo,
    }
}
     
    try {
        let respo = await axios.post(URL+"transfer",userdata,config);
        return respo.data
    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.response.data
        return thunkApi.rejectWithValue(message)
    }
})

export const LoanThunk = createAsyncThunk("Transfers/LoanThunk", async(userdata,thunkApi)=>{
    console.log(userdata);

    let token = await getUserInfo()?.token

    let SecUSerInfo = await getUserInfo()?.SecUSerInfo
    
const config = {
    headers:{
        token:token,
        SecUSerInfo: SecUSerInfo,
    }
}
    try {
        let respo = await axios.post(URL+"loan",userdata,config);
        return respo.data
    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.response.data
        return thunkApi.rejectWithValue(message)
    }
})


export const AirtimeThunk = createAsyncThunk("Transfers/AirtimeThunk", async(userdata,thunkApi)=>{

    console.log(userdata);
    let token = await getUserInfo()?.token
    let SecUSerInfo = await getUserInfo()?.SecUSerInfo 
const config = {
    headers:{
        token:token,
        SecUSerInfo: SecUSerInfo,
    }
}
    try {
        let respo = await axios.post(URL+"airtime",userdata,config);
        return respo.data
    } catch (error) {
        let message = (error.response && error.response.data && error.response.data.message) || error.response.data
        return thunkApi.rejectWithValue(message)
    }
})


 const TransferSlice = createSlice({
    name:"Transfers",
    initialState,
    reducers:{
        Reset:(state)=>{
            state.status = ""
            state.data = ""
            state.error = ""
         }
    },
    extraReducers:(builder)=>{
        builder.addCase(PreTransferThunk.pending, (state)=>{
            state.status = "pending"
        }).addCase(PreTransferThunk.fulfilled,(state,action)=>{
            state.status = "Fulfilled"
             state.data = action.payload
        }).addCase(PreTransferThunk.rejected,(state,action)=>{
            state.status = "Rejected",
            state.data =""
            state.error= action.payload
        }).addCase(TransferThunk.pending,(state)=>{
            state.status = "pending"
        }).addCase(TransferThunk.fulfilled,(state,action)=>{
            state.status = "Fulfilled"
            state.data = action.payload
        }).addCase(TransferThunk.rejected,(state,action)=>{
            state.status = "rejected"
            state.data = ""
            state.error= action.payload
        }).addCase(LoanThunk.pending,(state)=>{
            state.status = "pending"
        }).addCase(LoanThunk.fulfilled,(state,action)=>{
            state.status = "Fulfilled"
            state.data = action.payload
        }).addCase(LoanThunk.rejected,(state,action)=>{
            state.status = "rejected"
            state.data = ""
            state.error= action.payload
        }).addCase(AirtimeThunk.pending,(state)=>{
            state.status = "pending"
        }).addCase(AirtimeThunk.fulfilled,(state,action)=>{
            state.status = "Fulfilled"
            state.data = action.payload
        }).addCase(AirtimeThunk.rejected,(state,action)=>{
            state.status = "rejected"
            state.data = ""
            state.error= action.payload
        })
    }
})


 export const {Reset} = TransferSlice.actions
export const selectPreTX = (state)=> state.Transfers

export default TransferSlice