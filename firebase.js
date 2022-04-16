// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import { auth, getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

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
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

export const db = getFirestore(app);

console.log("hello3");

const isValidEmail = (email) => {

  if (!email.includes('@'))
      return false;

  const dom = email.substring(email.indexOf('@')+1);

  if (dom.endsWith('ucla.edu'))
      return true;

  return false;
}

const isValidPassword = (password, confirmPassword) => {
  if (password != confirmPassword) {
      return false;
  }
  if (password == "") {
      return false;
  }
  return true;
}

export const addUserToDB = async (email, password) => {
// TODO: remove password arg if never used
  try {
      const docRef = await addDoc(collection(db, 'Users'), {
        email: email,
        onBoarded: false
      });
  }
  catch (error) {
      console.error("error adding user to database");
      console.error(error)
      return 1;
  }
  return 0;
}

export const addUser = async (email, password) => {
    try {
        console.log("attempt to create new user");
        const auth = getAuth();
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        // await credential.user.sendEmailVerification();
        sendEmailVerification(credential.user);
        await addUserToDB(email, password);
        auth.signOut();
        alert("Email sent");
        console.log("Adding user : ", credential.user.email);
    }
    catch (error) {
        if (error.code == 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            alert('That email address is already in use!');
            console.error(error)
            return 1;
        }
        if(error.code == 'auth/invalid-email') {
            console.log('That email address is invalid!');
            alert('That email address is invalid!');
            console.error(error)
            return 1;
        }
        console.log("Error in sending verification email")
        console.error(error)
        return 1;
    }
    return 0;
}

console.log("hello4");

// addUserToDB("shlokj","noobj");