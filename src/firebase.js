// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAD1kXO44hQ4RP3068xd4Q9lEsgXWTiNUM",
  authDomain: "home-service-92c52.firebaseapp.com",
  projectId: "home-service-92c52",
  storageBucket: "home-service-92c52.firebasestorage.app",
  messagingSenderId: "550887223281",
  appId: "1:550887223281:web:70ad4c0db2705ec893de50",
  measurementId: "G-RMS5D6KQZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

export { auth, GoogleAuthProvider, signInWithPopup, messaging };