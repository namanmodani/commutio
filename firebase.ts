// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBc46sy-WFFWV3LGxfUjIz4uesxy-Y1TfY",
  authDomain: "commutio-app.firebaseapp.com",
  projectId: "commutio-app",
  storageBucket: "commutio-app.appspot.com",
  messagingSenderId: "403204977542",
  appId: "1:403204977542:web:0658b7d37d045a0d6bb207",
  measurementId: "G-DCLR4VMLJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);