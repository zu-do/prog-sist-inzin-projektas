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
declare module "*.png";

function App() {

  function Check (){
    const head = document.getElementById('head'); 
    const siSec = document.getElementById('signInSection'); 
    const content = document.getElementById('content');
    if (head !== null && siSec !== null && content !==null){
      if (auth.currentUser === null){
          head.style.display='none'
          siSec.style.display='flex'
          content.style.display='flex'
      }
      else {
        head.style.display='block'
        siSec.style.display='none'
        content.style.display='none'
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
        <div className='container'>
       
  <div className="chatbox">
    <div className="top-bar">
      <div className="avatar"></div>
      <div className="name">UserName</div>
      <div className="icons">
      </div>
      <div className="menu">
        <div className="dots"></div>
      </div>
    </div>
    <div className="middle">
    </div>
    <div className="bottom-bar">
      <div className="chat">
        <input type="text" placeholder="Type a message..." />
        <button className="send" type="submit">Send</button>
      </div>
    </div> 
    </div>
    </div>
    </div>
  )
}


setInterval(Check, 1000)
  return (
    <div className="App">
      
   <MainHeader/>

    <div className='main'>
      <Content/>

 <section className='signInSection' id='signInSection'>     
          <SignIn/>
          </section>
    

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
        
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});}} >Sign out</button></Link>
    </>
  )

}


export default App;
