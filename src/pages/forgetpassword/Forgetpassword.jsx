import React from 'react'
import "./forgetpassword.css"

function Forgetpassword() {
    return (
     <div className='forgot-cont'>
      <div className='main-forgot'>
        <div className='labal-forgot'>
          <h1>welcome </h1>
            <h4>to</h4>
          <h2> stack bank</h2>
        </div>
      <div className='content-forgot'>
         <h1> Reset Password</h1>
          <form action="">
              <input type="email" name="email" id="" placeholder='Enter your vailid email ' />
              <button type="submit"> Reset Password</button>
          </form>
          <hr />
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi nulla corrupti nobis laborum quidem deleniti.</p>
      </div>
    </div> 
    </div>
      )
}

export default Forgetpassword