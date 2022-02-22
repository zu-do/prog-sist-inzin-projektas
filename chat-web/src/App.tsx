import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCa9bz6v8yGfJHHktwx0hGvzf_NqOy6QY8",
  authDomain: "chat-web-projektas.firebaseapp.com",
  projectId: "chat-web-projektas",
  storageBucket: "chat-web-projektas.appspot.com",
  messagingSenderId: "966943128507",
  appId: "1:966943128507:web:82eac40edf4b396bf3a29e"
})

const auth = firebase.auth();

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <section>
          <SignIn/>
        </section>
      </header>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )

}

export default App;
