import React,{useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import profileDefault from '../../images/default.png'
import {db } from "../../util/FirebaseApp"
import { query ,collection,where,setDoc,doc ,getDocs} from "firebase/firestore";
import { useAuth} from '../../Contexts/AuthContext';
import CloseIcon from '@mui/icons-material/Close';

function MakeNewMessage(props) {
  const {currentUser} = useAuth();

   //chech if given array of chats has all the persons 
    async function checkArrays(namesToCheck){
      namesToCheck.push(currentUser.displayName)
      const q = query(collection(db, "chats"), where("persons", "array-contains", currentUser.displayName))
      const querySnapshot = await getDocs(q)
      var res

      querySnapshot.forEach((doc) => {
        if(doc.data().persons.every(elem => namesToCheck.includes(elem))){
          res =  doc.data()
        }
      });
      return res
  
    }
    
    function GetActiveWithName(name){
      return props.messages.length
        // for (let i in props.messages) {
        //    if(props.messages[i].persons[0] === name) return i
        // }
    }


    async function createChat(name){
      const q = query(collection(db, "chats"), where("persons", "array-contains", currentUser.displayName));
      const querySnapshot = await getDocs(q);
      var totalMessages = [];

      querySnapshot.forEach((doc) => {
          totalMessages.push(doc.data());
      });

      // change later to array of persons
      props.setActive([name])
      const chat = await checkArrays([name])

      if(chat){
        props.changeChat(chat)
        props.setShowSendNewMessage(false)
        return 
      }

      await setDoc(doc(collection(db, "chats",)), {
          persons:[currentUser.displayName,name],
          messages:[]
      })
      props.getMessages()
      totalMessages = [];
      const querySnapshot2 = await getDocs(q);
      querySnapshot2.forEach((doc) => {
        totalMessages.push(doc.data());
      });
      props.changeChat(await checkArrays([name]))
      props.setActive(name)
      props.setShowSendNewMessage(false)
    }

    function closeHandler(){
      props.setShowSendNewMessage(false)

    }

  return (
    <div className='h-screen w-screen flex justify-center pt-10 '>

      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: '#E7E9EC', padding:"20px", borderRadius:"15px" }}
        aria-label="contacts"
      >

      <div className='flex justify-end mb-5' >
        <CloseIcon onClick={closeHandler} sx={{cursor:"pointer"}}/>
      </div>

      {props.names.map((data) => {
      return (
        <ListItem disablePadding >
        <ListItemButton onClick={() => createChat(data)}>
          <ListItemIcon>
            <img src={profileDefault} className="profileImagePreview mr-5" alt="image"/>
          </ListItemIcon>
          <ListItemText primary={data}/>
        </ListItemButton>
        </ListItem>
      );
      })}
    </List>

  </div>
  )
}

export default MakeNewMessage;
