import React from 'react'
import { getUserInfo } from './authIndex'
import {Outlet,Navigate}  from "react-router-dom"

function PrivateRoute() {
    let token = getUserInfo()?.token
  
  return token ? <Outlet/> : <Navigate to="/login" />;
}



export default PrivateRoute

  