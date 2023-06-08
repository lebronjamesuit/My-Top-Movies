// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGZkDZ8AMOJWWBfkN0pZ_NG-1X6tiHx78",
  authDomain: "crud-firebase-forfun.firebaseapp.com",
  projectId: "crud-firebase-forfun",
  storageBucket: "crud-firebase-forfun.appspot.com",
  messagingSenderId: "868189916023",
  appId: "1:868189916023:web:220a291a20a8cd75396f72",
  measurementId: "G-NS6GZH1T6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);