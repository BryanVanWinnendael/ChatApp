import React,{useState,useEffect} from 'react';
import TextChannels from './components/TextChannels/TextChannels'
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import { useAuth} from './Contexts/AuthContext';
import "./App.css"
import {db } from "./util/FirebaseApp"
import { onSnapshot,query ,collection,where,getDocs} from "firebase/firestore";

import MakeNewMessage from './components/MakeNewMessage/MakeNewMessage';

function App() {
  const {currentUser,getNamesOthers} = useAuth();
  const [usedChat,setUsedChat] = useState()
  const [getmessages,setGetmessages] = useState()
  const [chatName,setChatName] = useState()
  const [showSendNewMessage,setShowSendNewMessage] = useState(false)
  const [names,setNames] = useState()
  const [active,setActive] = useState()

  function checkChat(chat){
    if(chatName){
      var checkerArray = [currentUser.displayName,chatName[0]] //0 for firs person
      let checker = (arr, target) => target.every(v => arr.includes(v));
      return checker(checkerArray,chat.persons)
    }
  }

  // get active chat id
  async function getChatId(){
    const q = query(collection(db, "chats"), where("persons", "array-contains", currentUser.displayName))
    const querySnapshot = await getDocs(q)
    var id = 0
    querySnapshot.forEach((doc) => {
      if(checkChat(doc.data())){
        id = doc.id
      }
    });
    return id
  }


  // given active chat updates chat content
  async function changeChat(data){
    const index = data.persons.indexOf(currentUser.displayName)
    if (index > -1) {
      data.persons.splice(index, 1)
    }
    setActive(data.persons)
    setUsedChat(data.messages)
    setChatName(data.persons)
  }


  async function getMessages() {
    const q = query(collection(db, "chats"), where("persons", "array-contains", currentUser.displayName));
    onSnapshot(q, (querySnapshot) => {
      
      var totalMessages = [];
      querySnapshot.forEach((doc) => {
        totalMessages.push(doc.data());
      });
      setGetmessages(totalMessages)
    
    });

  }

  useEffect( () => {
    getMessages()
  }, []);

 
  async function chooseNewMessage(){
    await getNamesOthers().then((e) =>{
       setNames(e)
     })
     setShowSendNewMessage(true)
   }

  return (
  <div>
    {currentUser && !showSendNewMessage && (
      <div className='MainGrid'>
        <TextChannels changeChat={changeChat} active={active} messages={getmessages} chooseNewMessage={chooseNewMessage}/>
        {usedChat && (
        <Chat data={getmessages} chatName={chatName} getChatId={getChatId}/> 
        )}
      </div>
    )}

    {!currentUser && (
      <Login/>
    )}

    {showSendNewMessage && (
      <MakeNewMessage getMessages={getMessages} setShowSendNewMessage={setShowSendNewMessage} changeChat={changeChat} names={names} setActive={setActive} messages={getmessages}/>
    )}
    
  </div>
  )
}

export default App;
