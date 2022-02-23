import React,{useState} from 'react';
import loginimage from '../../images/login.svg'
import LoginHandler from './LoginHandler'
import RegisterHandler from './RegisterHandler'
import ForgotPassword from './ForgotPassword';

function Login() {
    const [statePage, setstatePage] = useState("login");

    function setPageRegister(){
        setstatePage("register")
    }
    function setPageLogin(){
        setstatePage("login")
    }
    function setPageForgot(){
        setstatePage("forgot")
    }

  return (
  <div className='w-screen flex flex-col justify-center items-center mt-10'>
    <img src={loginimage}  alt="image" className='w-96'/>
    {statePage === "login" && (
        <div className='flex flex-col items-center'>
            <LoginHandler/>
            <p className='cursor-pointer text-[#90B8F8] underline' onClick={setPageRegister}>Don't have an account? Create an account</p>
            <p className='cursor-pointer text-[#90B8F8] underline' onClick={setPageForgot}>Forgot password</p>
        </div>
    )}
    {statePage === "register" && (
        <div className='flex flex-col items-center'>
            <RegisterHandler/> 
            <p className='cursor-pointer text-[#90B8F8] underline' onClick={setPageLogin}>Login</p>
        </div>
    )}
    {statePage === "forgot" && (
        <div className='flex flex-col items-center'>
            <ForgotPassword/>
            <p className='cursor-pointer text-[#90B8F8] underline' onClick={setPageLogin}>Login</p>
        </div>
    )}


    
  </div>
  )

}

export default Login;
