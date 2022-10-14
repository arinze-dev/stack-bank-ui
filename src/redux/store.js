import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth/authslice"
import dashDoardReducer from "./auth/dashboardSlice"
import TransferReducer from "./auth/TXSlice"

// .reducer

export const store =configureStore({
    reducer:{
    [authReducer.name]:authReducer.reducer,
    [dashDoardReducer.name]:dashDoardReducer.reducer,
    [TransferReducer.name]:TransferReducer.reducer,
    },
})