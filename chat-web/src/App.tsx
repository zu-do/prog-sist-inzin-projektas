import React, { useEffect, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged, signInWithPopup , signOut} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
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


function App() {

  function Check (){
    const head = document.getElementById('head'); 
    const siSec = document.getElementById('signInSection'); 
    if (head !== null && siSec !== null){
      if (auth.currentUser === null){
          head.style.display='none'
          siSec.style.display='flex'
      }
      else {
        head.style.display='block'
        siSec.style.display='none'
      }
    }

  }

function MainHeader(){

  return (
    
    <div className='head' id = 'head' >      {/*section seen when loggen in */}
    <span> Imperio 	&#9889; </span>
        <SignOut/>
     
    </div> 
  )
}


setInterval(Check, 1000)
  return (
    <div className="App">
      
   <MainHeader/>

   <header>
        <h2><a href="#" className="logo">Logo</a></h2>
        <div className="navigation">
        </div>
      </header>

    <div className='main'>

    <div className="content">
        <div className="info">
          <h2><span>Chat Web brings the team together wherever you are</span></h2>
          <p>Where just you and a handful of friends can spend time together. A place that makes
            it easy to talk every day and hang out more often.
          </p>
         
        </div> 
       
      </div>
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
      <button className="signOutButton" onClick={()=>{signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});}} >Sign out</button>
    </>
  )

}
export default App;
