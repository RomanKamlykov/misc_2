import React, { useState, useRef } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDg4NdKSxRaFHoQfkEJ5BFczqn0--rjShY",
  authDomain: "fir-1-e61bc.firebaseapp.com",
  databaseURL: "https://fir-1-e61bc.firebaseio.com",
  projectId: "fir-1-e61bc",
  storageBucket: "fir-1-e61bc.appspot.com",
  messagingSenderId: "166917173965",
  appId: "1:166917173965:web:0aaf25481320ea93bfaf84"
})

// make a reference to auth and firestore SDKs as global variables
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const[user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    // instantiating provider - создание экземпляра provider
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={()=>auth.signOut()}>Sign out</button>
  )
}

function ChatRoom() {

  // for autoscroll
  const dummy = useRef();

  // reference a firestore *collection*
  const messagesRef = firestore.collection('messages');
  // query *documents* in a collection
  const query = messagesRef.orderBy('createdAt').limit(25);

  // listen to data update with a *hook*
  // *reacts* to changes in realtime
  const [messages] = useCollectionData(query, {idField:'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });
    setFormValue('');

    // for autoscroll
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div>
        {messages && messages.map(msg=><ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e)=>setFormValue(e.target.value)} />
        <button type="submit">🕊️</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  )
}

export default App;
