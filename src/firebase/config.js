// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// const {
// VITE_APIKEY,
// VITE_AUTHDOMAIN,
// VITE_PROJECTID,
// VITE_STORAGEBUCKET,
// VITE_MESSAGINGSENDERID,
// VITE_APPID,
  
// } = getEnvironments();


// console.log(process.env);
// console.log(import.meta.env);

const firebaseConfig = {
  apiKey: "AIzaSyBC8449nnCed0S3KNG1cXq-A7dI62yFV-M",
  authDomain: "bigbite-55224.firebaseapp.com",
  projectId: "bigbite-55224",
  storageBucket: "bigbite-55224.appspot.com",
  messagingSenderId: "113801897542",
  appId: "1:113801897542:web:94cd47fd3e3e70ac0c0c47"
};


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
