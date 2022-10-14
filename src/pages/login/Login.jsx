import {useEffect,React} from 'react'
import {Form, Link,useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import {useDispatch,useSelector}  from "react-redux"
import "./login.css"
import {LoginThunk, selectlogedin,Reset} from "../../redux/auth/authslice"
import {ColorRing } from  'react-loader-spinner'
import {toast} from "react-toastify"





function Login() {

  const {handleSubmit, register , reset, formState:{errors}} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const IfLogin = useSelector(selectlogedin)

 const login = function (data) {
  dispatch(LoginThunk(data))
    reset()
   }

    useEffect(()=>{
       function checkUser(){
        if (IfLogin.status == "Fulfilled") {
          let message = `welcome ${IfLogin.user.name}`
          toast.success(message,{position: toast.POSITION.TOP_CENTER})
          sessionStorage.setItem("userInfo",JSON.stringify(IfLogin.user))
          setTimeout(() => {
            navigate("/dashbord")
          }, 2000);
        }else if(IfLogin.error){  
          let msg =  IfLogin.error;
          // console.log(msg);
          // msg = msg.split(' ').splice(0,11).join(" ")
          toast.error(msg,{position: toast.POSITION.TOP_CENTER})
        } 
      } 
      checkUser()
    },[IfLogin])
  
  return (
    <div className='login-cont'>
        <div className='main-div'>
            <div className='labal-div'>
                <h1>welcome </h1>
                  <h4>to</h4>
                <h2> stack bank</h2>
            </div>
            <div className='content-dev'>
              <h1> log in</h1>
              { IfLogin.status == "Pending"?<ColorRing
                                    visible={true}
                                    height="160"
                                    width="80"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                /> : 
                <form onSubmit={handleSubmit(login)}>
                    <input type="text" placeholder='email'{...register("email", { required: "Email is required",pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,	message: "invalid email address" }})} />
                    {<p className="errorStyle">{errors?.email?.message}</p>}
                    <input type="text" placeholder='password' {...register("password",{required: "Password is required",minLength:{value:8,message:"minimum value 8"}})}  /> 

                    {<p className="errorStyle">{errors?.password?.message}</p>}  
                    <button type="submit"> log in </button>
                </form>}
               <hr />
                 <p> if you don't have account please<Link to={"/createaccount"}> Create Account </Link></p>
                 <p>  <Link to={"/forgotpassword"}> Forgot Password</Link></p>
               <hr />
            </div>

        </div>
    </div>
  )
}

export default Login