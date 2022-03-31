import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Link, Outlet } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged, signInWithPopup , signOut} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import ExitPage from './components/ExitPage';
import logo from "./ChatWeb.png";
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { info, timeStamp } from 'console';
import {setDoc, doc, getFirestore, Timestamp, getDoc, collection } from 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCa9bz6v8yGfJHHktwx0hGvzf_NqOy6QY8",
  authDomain: "chat-web-projektas.firebaseapp.com",
  projectId: "chat-web-projektas",
  storageBucket: "chat-web-projektas.appspot.com",
  messagingSenderId: "966943128507",
  appId: "1:966943128507:web:82eac40edf4b396bf3a29e"
})


const provider = new GoogleAuthProvider();

const auth = getAuth();
const db = getFirestore();
var displayname = '';
declare module "*.png";

function App() {
  
  
  function Check (){
    const head = document.getElementById('head'); 
    const siSec = document.getElementById('signInSection'); 
    const siSec2 = document.getElementById('signInSection2'); 
    const siSec3 = document.getElementById('signInSection3'); 
    const content = document.getElementById('content');
    const chatview = document.getElementById('ChatviewContainer');
    if (head !== null && siSec !== null && content !==null && chatview !==null && siSec2 != null && siSec3 != null){
      if (auth.currentUser === null){
          head.style.display='none'
          siSec.style.display='flex'
          content.style.display='flex'
          chatview.style.display='none'
          siSec2.style.display= 'flex'
          siSec3.style.display= 'flex'
      }
      else {
        head.style.display='block'
        siSec.style.display='none'
        content.style.display='none'
        chatview.style.display='flex'
        siSec2.style.display= 'none'
        siSec3.style.display= 'none'
      }
    }

  }

  function Content()
  {
    return(
      <div className='content' id = 'content'>
      <div className='info'>
        <h2><span>Chat Web brings the team together wherever you are</span></h2>
        <p>Where just you and a handful of friends can spend time together. A place that makes
          it easy to talk every day and hang out more often.
        </p>
       
      </div>        
    </div>
    )
  }

function MainHeader(){

  return (
    
    <div className='head' id = 'head' >      {/*section seen when loggen in */}
    {/* <Link to="/"></Link> */}
          <ul>
            <span><img className='App-logo' src={logo} alt="logo"/></span>
            <li>  Imperio 	&#9889;</li>
            <li className='navbar'> My account </li>
            <li className='navbar'> Messages </li>
            <li className='navbar'> Friends </li>
          </ul>
        <SignOut/> 
      </div>
        
  )
}


setInterval(Check, 1000)
// Registration methods ------------------------------------------------------
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
  });
  const {name, email, password, error, loading} = data;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({...data, [e.target.name]: e.target.value})
    displayname = name;
  }
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setData({ ...data, error: '', loading: true});
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try{
        const result = await  createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name,
          email,
          createdAt: Timestamp.fromDate(new Date()),
        });
    }catch(err){
      setData({ ...data, error: "Bad crediantials" });
    }
  }
// Login methods ------------------------------------------------------
  const [data2, setData2] = useState({ //Login crediantials
    email2: '',
    password2: '',
    error2: '',
    loading2: false,
  });
  const { email2, password2, error2, loading2 } = data2; // creates data2 

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData2({ ...data2, [e.target.name]: e.target.value });
    displayname = email2;
  };
  const handleSubmit2 = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setData2({ ...data2, error2: '', loading2: true });
    try {
      const result2 = await signInWithEmailAndPassword(auth, email2, password2);
  
    } catch (err) {
      setData2({ ...data2, error2: 'bad credantials', loading2: false });
    }
  };

  return (
    <div className="App">
      
   <MainHeader/>

    <div className='main'>
      <Content/>

 <section className='signInSection' id='signInSection'>     
          <SignIn/>
          </section>


  <section className='signInSection' id='signInSection2'>
          <h3>Create An account</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className='input_container'>
                <label htmlFor="name">Name</label>
                <input type="text" name='name' value={name} onChange={handleChange}/>
            </div>
            <div className='input_container'>
                <label htmlFor="email">Email</label>
                <input type="text" name='email' value={email} onChange={handleChange}/>
            </div>
            <div className='input_container'>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={password} onChange={handleChange}/>
            </div>
            {error}
            <div className='btn_container'>
                <button className='btn'>Register</button>
            </div>
          </form>
          </section>



  <section className='signInSection' id='signInSection3'>
          <h3>Log into your Account</h3>
          <form className="form" onSubmit={handleSubmit2}>
            <div className="input_container">
                <label htmlFor="email2">Email</label>
                <input type="text" name='email2' value={email2} onChange={handleChange2}/>
            </div>
            <div className="input_container2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password2" value={password2} onChange={handleChange2} />
            </div>
        {error2}
            <div className="btn_container">
                <button className="btn">login</button>
            </div>
          </form>
          </section>
          
          <Chatview/>
    </div>
    
    </div>
  );
}

function Chatview(){
  const [user] = useAuthState(auth);

  return (
    <div id='ChatviewContainer'>
      <div className='container'>  
        <div className="chatbox">
          <div className="top-bar">
            <div className="avatar"></div>
            <div className="name">{user?.displayName ? user?.displayName : displayname}</div>
            <div className="menu"> 
              <div className="dots"></div>
            </div>
          </div>
          <div className="middle"></div>
          <div className="bottom-bar">
            <div className="chat">
              <input type="text" placeholder="Type a message..." />
              <button className="send" type="submit">Send</button>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);

   // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;

     setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      createdAt: Timestamp.fromDate(new Date()),
    });
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  return (
    <>
      <button className="signInButton" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}
function SignOut() {
  return (
    <>
      <Link to="exit"><button className="signOutButton" onClick={()=>{signOut(auth).then(() => { 
        alert("YOU WILL BE REDIRECTED TO OUR EXIT PAGE");
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});}} >Sign out</button></Link>
    </>
  )

}



export default App;
