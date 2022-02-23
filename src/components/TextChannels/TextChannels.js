import React,{useState} from 'react'
import profileDefault from '../../images/default.png'
import './style.css'
import PreviewChat from './PreviewChat'
import Profile from '../Profile/Profile'
import {useAuth} from "../../Contexts/AuthContext"
import MapsUgcIcon from '@mui/icons-material/MapsUgc';




function TextChannels(props,ref) {
  const {logout,currentUser} = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)
  const final = [];
 

  // given active chat
  function changeActive(i){
    if(i){
      props.changeChat(i)
    }
  }

  function ifWatched(array){
    for(var i of array){
      if(i === currentUser.displayName) return true
    }
    return false
  }

 for (let i in props.messages) {
   var activeName = null
   if(props.active){
    activeName = props.active[0]
   }
   final.push(
     <PreviewChat key={i} watched={ifWatched(props.messages[i].watched)} lastMessage={props.messages[i].messages[props.messages[i].messages.length -1]} name={getChatName(props.messages[i].persons)}  active={activeName === getChatName(props.messages[i].persons)[0]? true:false} onClick={() => {changeActive(props.messages[i])}}/>
   );
 }


  function getChatName(array){
    const index = array.indexOf(currentUser.displayName);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array
  }

  function openProfile(){
    setProfileOpen(true)
  }

  function closeProfile(){
    setProfileOpen(false)
  }

  function handleLogout(){
    logout()
  }



  return (
    <div className='bg-[#EEF2F8] h-screen max-h-screen flex flex-col'>
      {/* profile */}
      {profileOpen && (
        <Profile handleLogout={handleLogout} closeProfile={closeProfile}/>
      )}

      {/* header */}
      <div className='flex w-full items-center pl-10 pt-10'>
          <img src={profileDefault} className="profileImage cursor-pointer" alt="image" onClick={openProfile}/>
          <p className='m-4 text-lg font-bold'>ChatApp</p>
          <MapsUgcIcon sx={{cursor:"pointer"}} onClick={props.chooseNewMessage}/>
      </div>

      {/* searchbar */}
      <div className='pb-10'>
        <input className='bg-white h-12 mt-5 rounded-lg w-10/12 p-4 ml-10 shadow-md' placeholder="Search"/>
      </div>
      
      {/* preview chats */}
      <div className='overflow-y-scroll'  id="chatScroll">
        {final}
      </div>
    

    </div>
  )
}

export default TextChannels;