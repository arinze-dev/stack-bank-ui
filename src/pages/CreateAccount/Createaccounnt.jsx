// import {useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {toast} from "react-toastify"
import {useEffect} from "react"
import "./Createaccount.css"
import { useForm}from "react-hook-form"
import {Register,selectRegistered,Reset} from "../../redux/auth/authslice"

import {ColorRing } from  'react-loader-spinner'


function Createaccounnt() {
    const navigate = useNavigate()
    const IfRegitered = useSelector(selectRegistered)
    const dispatch = useDispatch()
    const { register, handleSubmit,reset ,formState:{errors}} = useForm()
   
    
    useEffect(()=>{
      Reset()
    })
   
  const onSubmit = (data) => {
      try {
      if(data.password === data.comfirmpassword){
        const userdata ={
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password:data.password,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth
        }
        dispatch(Register(userdata))
        reset();
      }else{
        
        toast.error("comfirmpassword doesn't match password",{position:toast.TOP_CENTER}) 
      }
    } catch (error) {
      toast.error(error,{position:toast.TOP_CENTER}) 
    }
  }
   useEffect(()=>{
     if(IfRegitered.status== "Fulfilled"){
      toast.success(IfRegitered.userRegister?.message,{position: toast.POSITION.TOP_CENTER})
      sessionStorage.setItem("Registered","true")
      navigate("/login")
      Reset()
     }else if(IfRegitered.error){
      toast.error(IfRegitered.error,{position: toast.POSITION.TOP_CENTER})
     }
   },[IfRegitered])

   { console.log(IfRegitered.status)}
   { console.log(IfRegitered.userRegister?.message)}

  return (
    <div className='create-cont'>
       <div className='main-create'>
           <div className='labal-create'>
             <h2> stack bank</h2>
            </div>
             <div className='content-create'>
              <h1> Create Account</h1> 
                 
                { IfRegitered.status == "Pending"?<ColorRing
                                    visible={true}
                                    height="340"
                                    width="80"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                /> : 
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input type="text" placeholder='Firstname' {...register("firstname",{required: "firstName is required", minLength:{value: 2, message:"min value is 2"}})} />
                          {<p className="errorStyle">{errors?.firstname?.message}</p>}     
                   <input type="text" placeholder='Lastname' {...register("lastname",{required: "lastname is required", minLength:{value: 2, message:"min value is 2"}})} /> 
                   {<p className="errorStyle">{errors?.lastname?.message}</p>}    

                   <input type="text" placeholder='email' {...register("email", { required: "Email is required",pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,	message: "invalid email address" }, minLength: {value: 5,message: "min value is 5"}})}  />
                   {<p className="errorStyle">{errors?.email?.message}</p>}    

                    <input type="date" placeholder='date of birth' {...register("dateOfBirth", {required:"data of birth is required"})} />
                    {<p className="errorStyle">{errors?.dateOfBirth?.message}</p>}    

                   <input type="phone" placeholder='Phone number ' {...register("phone",{required: "Phone Number is required",minLength:{value:2,message:"minimum value 11"}, maxLength:{value:11, message:" The Max phone number is 11"}})}/>
                   {<p className="errorStyle">{errors?.phone?.message}</p>}  

                    <input type="text" placeholder='password' {...register("password",{required: "Password is required",minLength:{value:8,message:"minimum value 8"}, maxLength:{value:18, message:" The Max phone number is 18"}})} /> 
                    {<p className="errorStyle">{errors?.password?.message}</p>}  
                    <input type="text" placeholder='comfirm-password' {...register("comfirmpassword",{required: "Please comfirm password"})} /> 
                    {<p className="errorStyle">{errors?.comfirmpassword?.message}</p>}  
                   <button type="submit"> Create </button>
                 </form> }
               <hr />
                 <p> if you  have account click here <Link to={"/login"}> log in </Link></p>
               <hr />
            </div> 
       </div>
    </div>
  )
}

export default Createaccounnt