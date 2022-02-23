import React, { useContext,useState,useEffect  } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,sendPasswordResetEmail,updateProfile} from "firebase/auth";
import { auth,database,db } from "../util/FirebaseApp"
import { collection, getDocs ,addDoc } from "firebase/firestore"; 
import {ref, child, get,getDatabase } from "firebase/database";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}


export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState();
    
    const [loading , setLoading] = useState(true)
    
    async function signup(email,password,usernameGive){
        const username = usernameGive

        try{
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            updateProfile(auth.currentUser, {
              displayName: usernameGive
            })

            const USERID =  userCredential.user.uid;
            setName(username,USERID)
        })
        }
        catch(err){
            throw err
        } 
        
    }

 

    async function login(email,password){
        try{
            await signInWithEmailAndPassword(auth, email, password)
        }
        catch(err){
            console.log(err)
            throw err
        } 
    }

    async function setName(name,uid){  
        try {
            await addDoc(collection(db, "displayname"), {
                name,
                uid
            });
           
        } 
        catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    async function getNames(){
        var res = []
        const querySnapshot = await getDocs(collection(db, "displayname"))
        const arr =  querySnapshot.docs.map(doc => doc.data())
     
        for (var i of arr){
            res.push(i.name)
        }
        return res

    }

    async function getNamesOthers(){
        var res = []
        const querySnapshot = await getDocs(collection(db, "displayname"))
        const arr =  querySnapshot.docs.map(doc => doc.data())
     
        for (var i of arr){
            if(i.name != currentUser.displayName){
                res.push(i.name)
            }
        }
        return res
    }

    
    async function resetPassword(email) {
        console.log(email)
        try{
            await sendPasswordResetEmail(auth, email)
        }
        catch (e) {
            throw e
        }
    }

    function logout(){
        auth.signOut();
    }

   
  

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
  

    const value = {
        currentUser,
        signup,
        getNames,
        setName,
        login,
        resetPassword,
        logout,
        getNamesOthers
     
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

