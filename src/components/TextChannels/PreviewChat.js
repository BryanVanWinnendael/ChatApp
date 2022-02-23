import React from 'react';
import profileDefault from '../../images/default.png'
import {useAuth} from "../../Contexts/AuthContext"



const PreviewChat = (props) =>{
  const {currentUser} = useAuth()

  const classActive = props.active === true? "flex items-center p-5 cursor-pointer bg-[#E7E9EC]" : "flex items-center p-5 cursor-pointer"
  const read = props.watched? " text-[#6A5E5E] max-w-lg w-40 text-ellipsis whitespace-nowrap overflow-hidden" : " font-bold text-black max-w-lg w-40 text-ellipsis whitespace-nowrap overflow-hidden"


  return (
    <div className={classActive} onClick={props.onClick}>
      <img src={profileDefault} className="profileImagePreview mr-5" alt="image"/>
  
      <div className=''>
         
            {props.name.map(name => (  
              
              <p className='font-bold' key={name}>
                {name}  
              </p>
            ))}  
          
          <div className='grid grid-cols-2 w-full '>
            <p className={read} >{
            props.lastMessage.sender ===  currentUser.displayName? "you: " +  props.lastMessage.message :  props.lastMessage.message
            }</p>
            {!props.watched && (
              <div className='flex justify-end'>
                <span class="dot justify-end"></span>
              </div>
            )}
          </div>

         
      </div>
    </div>
    )
}

export default PreviewChat