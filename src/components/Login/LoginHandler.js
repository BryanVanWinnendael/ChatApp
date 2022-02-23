import React, { useState,useRef } from "react";
import {useAuth} from "../../Contexts/AuthContext"
import "./style.css"

function LoginHandler() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState('');
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleSubmit(e){
      
        e.preventDefault()
        
        if(emailRef.current.value === "" ||passwordRef.current.value === ""){
            return setError('Please fill in everything')
        }

        if(!validateEmail(emailRef.current.value)){
            return setError('Please fill in a valid email');
        }

        try{
            setError('')
            setLoading(true)
            login(emailRef.current.value,passwordRef.current.value).catch((err) =>  {
                console.log("heeee" + err)
                switch(err.code){
                    case 'auth/too-many-requests':
                        setError('Too many tries. Try again later.')
                        break;
                    default:
                        setError('Email or password is invalid');
                }
            } );

           
        }
        catch{
            setError('Email or password is invalid')
        }
        setLoading(false)
    }

  return (
  <div>
    {error && <p style={{
        color:'#A71313',
        margin:"1.25rem"
    }}>{error}</p>}
    <form className="flex flex-col w-96 formLogin" onSubmit={handleSubmit} novalidate>
        <input type="email"  placeholder="Email" ref={emailRef}/>
        <input type="password" placeholder="Password" className='m-5' ref={passwordRef}/>
        <button type="submit" className='bg-[#90B8F8] h-10 rounded-md text-white m-5 hover:bg-[#7396cf]' disabled={loading}>Sign in</button>
    </form>
  </div>
  )
}

export default LoginHandler;
