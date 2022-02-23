import React,{useRef,useState} from 'react';
import {useAuth} from "../../Contexts/AuthContext"

function ForgotPassword() {
  const emailRef = useRef();
  const {resetPassword} = useAuth();
  const [ResetSucces, setResetSucces] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    try{
      resetPassword(emailRef.current.value )
      setResetSucces("Email has been sent")
    }
    catch(e){
      setResetSucces('A problem has occured. Try again.')
    }

  }

  return (
  <div>
    {ResetSucces && (
      <p style={{
          color:'#69aa5e',
          margin:"1.25rem"
      }}>{ResetSucces}</p>
    )}

    <form className="flex flex-col w-96 formLogin" novalidate onSubmit={handleSubmit}>
      <input type="email"  placeholder="Email" ref={emailRef} />
      <button type="submit" className='bg-[#90B8F8] h-10 rounded-md text-white m-5 hover:bg-[#7396cf]'>Send email</button>
    </form>
  </div>
  )
}

export default ForgotPassword;
