import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { AirtimeThunk ,selectPreTX,Reset} from '../../redux/auth/TXSlice'
import "./airtime.css"

function Airtime() {
  const dispatch = useDispatch()

  const [airtimeData, setAirtimeData] = useState({amount:"",phone:""})

   const checkValue = function (e) {
    e.preventDefault()
    setAirtimeData(prev=>({...prev,[e.target.name]:e.target.value}))
   }

   const AirtimeFUN = function (e) {
    e.preventDefault()
    if(airtimeData.amount && airtimeData.phone){
      dispatch(AirtimeThunk(airtimeData))
    }
   }
    
   const AirtimeTX = useSelector(selectPreTX)
   useEffect(()=>{
    dispatch(Reset())
  },[])

   useEffect(()=>{
    async function checkAirtime(){
      if (AirtimeTX.status == "Fulfilled") {
        toast.success(AirtimeTX.data,{position: toast.POSITION.TOP_CENTER})
        navigate("/dashbord") 
      }else if(AirtimeTX.error){ 
        let msg = await AirtimeTX.error || "Something went wrong";
        // msg = msg.split(' ').splice(0,11).join(" ")
        toast.error(msg,{position: toast.POSITION.TOP_CENTER})
      } 
      } 
    checkAirtime()
  },[AirtimeTX])
  
  return (
    <div className='content-airtime'>
        <div className='details'><button>Back</button><h4>Airtime Form</h4> </div>
      <form action="">
          <input type="number" placeholder='Amount'onChange={checkValue} name='amount' /> 
          <input type="number" placeholder='Phone Number' onChange={checkValue}  name='phone' /> 
          <button type="button" onClick={AirtimeFUN}>Transfer </button>
      </form>

  </div>
  )
}

export default Airtime