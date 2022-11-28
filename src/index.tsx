import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBT2WglYIbDcmpJA53sypGP2aO0mVas3Y",
  authDomain: "pokeplant-d0a92.firebaseapp.com",
  projectId: "pokeplant-d0a92",
  storageBucket: "pokeplant-d0a92.appspot.com",
  messagingSenderId: "564829321312",
  appId: "1:564829321312:web:9034eac0c574b1fed7ab05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
