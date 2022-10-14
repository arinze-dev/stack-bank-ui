import React from 'react'
import "./Resetpassword.css"
function Resetpassword() {
  return (
  <div className='reset-cont'>
    <div className='main-reset'>
      <div className='labal-reset'>
        <h1>welcome </h1>
          <h4>to</h4>
        <h2> stack bank</h2>
      </div>
     <div className='content-reset'>
     <h1> Reset Password</h1>
        <form action="">
            <input type="password" name="email" id="" placeholder='New Password ' />
            <input type="comfirm password" name="comfirmpassword" id="" placeholder='comfirm password' />
            <button type="submit"> Reset</button>
        </form>
        <hr />
        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>
  </div> 
  </div>
 )}

export default Resetpassword