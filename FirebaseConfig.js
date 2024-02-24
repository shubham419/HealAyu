// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2dQHs6VkmXnxHAIcfXJwCD2voMfKYAHg",
  authDomain: "healayu.firebaseapp.com",
  projectId: "healayu",
  storageBucket: "healayu.appspot.com",
  messagingSenderId: "328571819214",
  appId: "1:328571819214:web:db0925cfa4479b7f37ec9f",
  measurementId: "G-LH754YNW2E"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);