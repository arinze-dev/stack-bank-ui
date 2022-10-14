
import React,{useEffect} from 'react'
import "./loan.css"
import { LoanThunk, selectPreTX,Reset} from '../../redux/auth/TXSlice'
import {useNavigate} from "react-router-dom"
import {useDispatch,useSelector}  from "react-redux"
// import {} form 
import { useState } from 'react'
import {toast} from "react-toastify"


function Loan() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const LoanTx = useSelector(selectPreTX)
  const [LoanData, setLoanData] = useState({
    amount:""
  });

  
  const CheckLength = function (e) {
     setLoanData(prev=>({...prev,[e.target.name]:parseInt(e.target.value)}))
  }
  
  const LoanFUNC = function(e){
      e.preventDefault()
      if(LoanData.amount){
        dispatch(LoanThunk(LoanData))
         dispatch(Reset(LoanTx))
       }
    }


  useEffect(()=>{
    async function checkLoan(){
      if (LoanTx.status == "Fulfilled") {
        toast.success(LoanTx.data,{position: toast.POSITION.TOP_CENTER})
        navigate("/dashbord") 
      }else if(LoanTx.error){ 
        let msg = await LoanTx.error || "Something went wrong";
        // msg = msg.split(' ').splice(0,11).join(" ")
        toast.error(msg,{position: toast.POSITION.TOP_CENTER})
      } 
    } 
    checkLoan()
  },[LoanTx])
  
  return (
    <div className='content-loan'>
        <div className='details'><button>Back</button>  <h4>Loan Form</h4> </div>
      <form action="">
          <input type="text" placeholder='Amount' onChange={CheckLength} name='amount' /> 
          <button  onClick={LoanFUNC} >Loan</button>
      </form>
  </div>
  )
}

export default Loan