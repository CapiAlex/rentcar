// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0PiSccC7-i8UvQgQzDxIsSVmghjqsd_M",
  authDomain: "rentingcarmt3.firebaseapp.com",
  projectId: "rentingcarmt3",
  storageBucket: "rentingcarmt3.appspot.com",
  messagingSenderId: "426513976518",
  appId: "1:426513976518:web:9b351e8c01dfdac1281bc7",
  measurementId: "G-XFZ7YEXDG0"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;