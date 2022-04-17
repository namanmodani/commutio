import { borderLeft, fontFamily } from "@mui/system";
import React, { FunctionComponent } from "react"
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { app } from './../firebase';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import Router from "next/router";

const signIn = async (email: string, password: string) => {
    signInWithEmailAndPassword(getAuth(app), email, password)
        .then(async(userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.sessionStorage.setItem("loginEmail", email);
            if (user.emailVerified) {
                // alert('w');
                // console.log("user verified, sign in")
                await Router.push('/home');
                return 0;
            }
            else {
                sendEmailVerification(user);
                alert("Your email has not been verified. The verification email has been resent; please click on the link to verify.");
                return 1;
                // await Router.push('/');
            }
        })
        .catch((error) => {
            console.log(error);
            if (error.code == 'auth/user-not-found') {
                alert("Couldn't find this email address in our database! Please sign up.");
                Router.push('/signup')
                return 2;
            }
            else if (error.code == 'auth/wrong-password') {
                alert("Incorrect password!");
                console.log("Incorrect password!");
                return 3;
            }
            console.log("Couldn't sign you in. Please try again.")
            return 4;
        });
}

const Login=()=>{
    const {  register, handleSubmit } = useForm();
    const onSubmit = async (data: {[x:string]:string}) => {
        console.log("logging in...");
        console.log(data);
        await signIn(data.email,data.password);
    };
    return (<div style = {{ display: "flex", alignItems: "center", justifyContent: "center", }}>
        <Col xs = {100}>
            <Form onSubmit = {handleSubmit(onSubmit)}>
                <h3 style = {styleObj}>Sign In</h3>
                <div className = "form-group">
                    <input
                        type = "email"
                        className = "form-control"
                        placeholder = "Enter email"
                        {...register("email")}
                        required
                        style = {styleFloat} />
                </div>
                <div className = "form-group">
                    <label></label>
                    <input
                        type = "password"
                        className = "form-control"
                        placeholder = "Enter password"
                        {...register("password")}
                        required
                        style = {styleFloat}
                        />
                </div>
                <div className = "form-group">
                    <div className = "custom-control custom-checkbox">
                        <input type = "checkbox" className = "custom-control-input" id = "customCheck1" />
                        <label className = "custom-control-label" style = {stylePass} htmlFor = "customCheck1"> Remember me</label>
                    </div>
                </div>
                <div><Button> Submit</Button></div>
            </Form >
        </Col >
    </div >);
}
export default Login;

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