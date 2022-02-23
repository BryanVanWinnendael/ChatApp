import React,{useRef,useEffect} from 'react'
import profileDefault from '../../images/default.png'
import {useAuth} from "../../Contexts/AuthContext"
import { doc ,updateDoc,arrayUnion} from "firebase/firestore";
import {db } from "../../util/FirebaseApp"


function Chat(data) {
  const {currentUser} = useAuth()
  const receiver = "flex justify-start m-10 "
  const sender = "flex justify-end m-10"
  const final = []
  const messageRef = useRef();
  const messageEl = useRef(null);


  async function sendMessage(e){
    e.preventDefault()
    const chatId = await data.getChatId()
    const chatsRef = doc(db, "chats", chatId);
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    const message = {
      "sender":currentUser.displayName,
      "message":messageRef.current.value,
      "time": dateTime
    }

    await updateDoc(chatsRef, {
      messages: arrayUnion(message),
      watched: [currentUser.displayName]
    });
    messageRef.current.value = ""
  }

  getActiveChat()

  function hexToRGB(hex){
    let r = 0, g = 0, b = 0;
    // handling 3 digit hex
    if(hex.length == 4){
       r = "0x" + hex[1] + hex[1];
       g = "0x" + hex[2] + hex[2];
       b = "0x" + hex[3] + hex[3];
       // handling 6 digit hex
    }else if (hex.length == 7){
 
       r = "0x" + hex[1] + hex[2];
       g = "0x" + hex[3] + hex[4];
       b = "0x" + hex[5] + hex[6];
    };
 
    return [+r,+g,+b]
      
 }

  function luminanace(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function contrast(rgb1, rgb2) {
      var lum1 = luminanace(rgb1[0], rgb1[1], rgb1[2]);
      var lum2 = luminanace(rgb2[0], rgb2[1], rgb2[2]);
      var brightest = Math.max(lum1, lum2);
      var darkest = Math.min(lum1, lum2);
      return (brightest + 0.05)
          / (darkest + 0.05);
  }

  
  function getActiveChat(){
    let checker = (arr, target) => target.every(v => arr.includes(v));
    const localColor = localStorage.getItem("color")? localStorage.getItem('color'):"#90B8F8"
    
    for(var i of data.data){
      if(checker(i.persons,data.chatName)){
          for (let j of i.messages) {
            var textColor = currentUser.displayName === j.sender?"white":"black"
            const contrastR = contrast(hexToRGB(textColor),hexToRGB(currentUser.displayName === j.sender? localColor:"#EEF2F8"))
            if(currentUser.displayName === j.sender && contrastR > 15){
              textColor = "black"
            }
            console.log(contrastR)
            final.push(
              <div key={j.time} className={currentUser.displayName === j.sender?sender:receiver} >
              
                <p  
                className="p-2 rounded-md  max-w-md h-fit break-all"
                style={{
                  backgroundColor: currentUser.displayName === j.sender? localColor:"#EEF2F8",
                  color: textColor
                }}
                >
                {j.message}
                </p>
              </div>
            );
          }
      }
    }
  }


  async function updateWatched(){
    
    const chatId = await data.getChatId()
    const chatsRef = doc(db, "chats", chatId);
  
    await updateDoc(chatsRef, {
      watched: arrayUnion(currentUser.displayName)
    });
  }

  updateWatched()
  useEffect(() => {
    
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight });
      });
    }
    
    
  }, [])

  

  
 
  return (
  <div className='grid grid-rows-chat max-h-screen'>
      {/* header */}
      <div className='m-5 flex items-center text-xl font-bold bg-[#EEF2F8] w-3/4 p-2 rounded-lg'>
        <img src={profileDefault} className="profileImagePreview mr-5" alt="image"/>
        {data.chatName.map(name => (  
            <p key={name}>
              {name}  
            </p>
        ))}  
        
      </div>

      {/* chat */}
      <div className='ml-5 mt-5 overflow-y-scroll flex flex-col-reverse' id="chatScroll" ref={messageEl}>
        <div>
          {final}
        </div>
      </div>

      {/* input */}
      <div className='grid grid-cols-input items-center'>
        <form className='flex'>
          <input className='h-12 rounded-lg w-full p-4 ml-10 shadow-md bg-[#EEF2F8] mr-5' placeholder="Type" ref={messageRef}/>
          <button className='bg-[#90B8F8] w-2/4 h-12 rounded-md text-white hover:bg-[#7396cf]' onClick={sendMessage}>Send</button>
        </form>
        
      </div>
  </div>)
}

export default Chat;
