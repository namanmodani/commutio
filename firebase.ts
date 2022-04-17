// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyi_dL2s3UqyOc1-vrtQP-mHlGYbNS0u4",
  authDomain: "commutio-app.firebaseapp.com",
  projectId: "commutio-app",
  storageBucket: "commutio-app.appspot.com",
  messagingSenderId: "403204977542",
  appId: "1:403204977542:web:0658b7d37d045a0d6bb207",
  measurementId: "G-DCLR4VMLJE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const mAuth = getAuth();
export const db = getFirestore(app);