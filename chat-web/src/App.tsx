import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Link, Outlet } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged, signInWithPopup , signOut} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Footer from './components/Footer';
import logo from "./ChatWeb.png";
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { info, timeStamp } from 'console';
import {setDoc, doc, getFirestore, Timestamp, getDoc, collection } from 'firebase/firestore'

import {useCollectionData} from 'react-firebase-hooks/firestore'
firebase.initializeApp({
  apiKey: "AIzaSyCa9bz6v8yGfJHHktwx0hGvzf_NqOy6QY8",
  authDomain: "chat-web-projektas.firebaseapp.com",
  projectId: "chat-web-projektas",
  storageBucket: "chat-web-projektas.appspot.com",
  messagingSenderId: "966943128507",
  appId: "1:966943128507:web:82eac40edf4b396bf3a29e"
})

const riccardo = 'data:image/jpeg;base64,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';
const provider = new GoogleAuthProvider();

const auth = getAuth();
const db = getFirestore();
var displayname = '';
declare module "*.png";

const firestore = firebase.firestore();

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
    <Footer/>
    </div>
  );
}

function Chatview(){
  const [user] = useAuthState(auth);
  const dummy : any = useRef();
  const messagesRef = firestore.collection('messages');
  const query :any = messagesRef.orderBy('createdAt').limit(500);

  const [messages] = useCollectionData(query);

  const [formValue, setFormValue] = useState('');
  const scroll = () =>{
    dummy.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
     }
   // }
  
   useEffect(()=>{
    scroll();

   })


  const sendMessage = async (e :any) => {
    e.preventDefault();

   // const { uid, photoURL } = auth.currentUser;
    const uid = auth.currentUser?.uid
    const photoURL = auth.currentUser?.photoURL
    const name = auth.currentUser?.displayName;
    
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      name
    })

    setFormValue('');
    // if (dummy !== null && dummy !== undefined){
   
  }

  return (
    <div id='ChatviewContainer'>
      <div className='container'>  
        <div className="chatbox">
          <div className="top-bar">
          <img  className="avatarPhoto" src={auth.currentUser?.photoURL || riccardo} /> 
            <div className="name">{user?.displayName ? user?.displayName : displayname}</div>
            <div className="menu"> 
              <div className="dots"></div>
            </div>
          </div>

          <div className="middle">
            
          {/* <div className="bottom-bar"> */}
            <div className="chat">
            <main>

          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
          <span ref={dummy}></span> 

       

          </main>
            </div>
          {/* </div>  */}
        </div>
        </div>
        <form className='sendForm' onSubmit={sendMessage}>
<span className='input'>
<input className='messageInput' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

<button className='sendButton' type="submit" disabled={!formValue}>🕊️</button>
</span>
</form>
      </div>
      
    </div>
        
  );
}
function ChatMessage(props : any) {
  const { text, uid, photoURL, name } = props.message;
 
  let messageClass ="";
  let userClass ="";
  if (auth.currentUser!==null){
   messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
   userClass = uid === auth.currentUser.uid ? 'userSent' : 'userReceived';
  }
  return (<>
   <span className={`userName ${userClass}`}>{name}</span>
 <div className={`message ${messageClass}`}>
    <img  className="messagePhoto" src={photoURL || riccardo} /> 
    <div className='messageTextContainer'>
      <p className='messageText'>{text}</p>
      </div>
     
    </div>
  
  </>)
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