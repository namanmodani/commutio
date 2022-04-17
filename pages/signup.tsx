import React from "react";
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { app, mAuth } from './../firebase';
import { getFirestore, doc, setDoc, addDoc, collection, getDoc, getDocs } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Router from "next/router";
import styled from 'styled-components';

const db = getFirestore(app);


const addUserToDB = async (email, password) => {
    // TODO: remove password arg if never used
      try {
        //   const docRef = await addDoc(collection(db, 'Users'), {
        //     email: email,
        //     onBoarded: false // when a user is NOT onboarded, it means that they have 
        //   });
        const docRef = await setDoc(doc(db, 'Users', email), {
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

const signUp = (
    email: string,
    password: string
) => {
    createUserWithEmailAndPassword(getAuth(app), email, password)
        .then(async (userCredential) => {
            console.log("attempt to create new user");
            // await credential.user.sendEmailVerification();
            sendEmailVerification(userCredential.user);
            await addUserToDB(email, password);
            mAuth.signOut();
            alert("Email sent. Please verify and log in.");
            console.log("Adding user : ", userCredential.user.email);
            Router.push('/login')
        })
        .catch((error) => {
            if (error.code == 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                alert('That email address is already in use! Please sign in.');
                Router.push('/login')
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
        });
};

const SignUp = () => {
    const {  register, handleSubmit } = useForm();
    const onSubmit = async (data: { [x:string]: string }) => {
        console.log(data);
        if (!data.email.includes("ucla.edu")){
            alert("commutio only supports UCLA students at the moment. Stay tuned!");
        }
        else if (data.password !== data.password2) {
            alert("Password mismatch! Re-enter password");
        }
        else {
            await signUp(data.email, data.password);
        }
    };
    return (<div style = {{ display: "flex", alignItems: "center", justifyContent: "center", }}>
        <Col xs={100}>
            <Form  onSubmit = {handleSubmit(onSubmit)}>
                <h3 style = {styleObj}>Sign Up</h3>
                <div className = "form-group">
                    <input
                        type = "email"
                        className = "form-control"
                        placeholder = "Enter email address"
                        {...register("email")}
                        required
                        style = {styleFloat} />
                </div>
                <div className = "form-group">
                    <label></label>
                    <input
                        type = "password"
                        className = "form-control"
                        {...register("password")}
                        placeholder = "Enter password"
                        required
                        style = {styleFloat} />
                </div>
                <div className="form-group">
                    <label></label>
                    <input type="password"
                           className = "form-control"
                           placeholder = "Confirm password"
                           {...register("password2")}
                           required
                           style = {styleFloat}
                    />
                </div>
                <div className = "form-group">
                    <div className = "custom-control custom-checkbox">
                        <input
                            type = "checkbox"
                            className = "custom-control-input"
                            id = "customCheck1"
                        />
                        <label className="custom-control-label" style = {stylePass} htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div><Button>Submit</Button></div>
            </Form>

        </Col>
    </div>);
}
export default SignUp;

const Button = styled.button`
  background-color: #000000;
  border: none;
  color: #ffffff;
  height: 60px;
  width: 250px;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 20px 0px;
  cursor: pointer;
`;

const styleObj = {
    fontSize: 40,
    color: "#000000",
    paddingTop: "180px",
    paddingBottom: "20px",
    fontFamily: "Inter",
    fontWeight: "bold",
}

const stylePass = {
    fontSize: 15,
    color: "#000000",
    fontFamily: "Inter",
    marginLeft: "5px",
    marginTop: "20px",
}

const styleFloat = {
    fontSize: 20,
    paddingTop: "10px",
    paddingBottom: "10px",
    fontFamily: "Inter",
}