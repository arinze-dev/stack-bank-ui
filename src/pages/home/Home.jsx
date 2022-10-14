

import {useState,React} from 'react'
import {Link} from "react-router-dom"

import "./home.css"

function Home() {
  return (
    <div className='home-main'>
        <div className='left-side'>
          
        <div className='left-side-inner'>
        <h1>You are we come </h1>
             <h3> to</h3>
            <h1>stack bank</h1>            
               <hr />
            <div className='btn-area'>
                <button> <Link to={"/createaccount"}> Create Account</Link></button>
                <button> <Link to={"/login"}>Log In </Link></button>
            </div>
            <hr />
        </div>
        </div>
        <div className='right-side'></div>      
    </div>
  )
}

export default Home