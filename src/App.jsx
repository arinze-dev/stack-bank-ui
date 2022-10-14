import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import Createaccounnt from "./pages/CreateAccount/Createaccounnt"
import Dashbord from "./pages/dashbord/dashbord"
import Forgetpassword from './pages/forgetpassword/Forgetpassword'
import Resetpassword from './pages/reset-password/Resetpassword'
import './App.css'
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import PrivateRoute  from './auth/PrivateRoute';


function App() {
  return (
       <Router>
        <Routes>
        <Route path='/' element ={<Home/>} />
            <Route path='/login' element ={<Login/>} />
            <Route path='/forgotpassword' element ={<Forgetpassword/>} />
            <Route path='/resetpassword' element={<Resetpassword/>}/>            
            <Route path='/createaccount' element ={<Createaccounnt/>} />
           <Route element={<PrivateRoute/>}>
              <Route path='/dashbord' element={<Dashbord/>}/>
           </Route>
        </Routes>
       <ToastContainer/>
       </Router>
     
  )
}

export default App
