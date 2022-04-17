// ask for the user's name, phone number, etc on this page
// we won't verify the phone number. we could if we have time

import { borderLeft, fontFamily } from "@mui/system";
import React, { FunctionComponent } from "react"
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { app } from './../firebase';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import Router from "next/router";
import { getFirestore, doc, setDoc, addDoc, collection, getDoc, getDocs } from "firebase/firestore"; 

const db = getFirestore(app);

const userEmail = getAuth(app).currentUser?.email;

const onboardUser = async (email, fullname, phone) => {
    try {
        const response = await setDoc(doc(db, 'Users', email), {
            email: email,
            fullname: fullname,
            phone: phone,
            onBoarded: true,
        });
        Router.push('/home');
        return 0;
    }
    catch (error) {
        console.log("couldn't onboard user");
        return 1;
    }
}

const Onboard=()=>{
    const {  register, handleSubmit } = useForm();
    const onSubmit = async (data: {[x:string]:string}) => {
        console.log("logging in...");
        console.log(data);
        await onboardUser(userEmail, data.email,data.password);
    };
    return (<div style = {{ display: "flex", alignItems: "center", justifyContent: "center", }}>
        <Col xs = {100}>
            <Form onSubmit = {handleSubmit(onSubmit)}>
                <h3 style = {styleObj}>Complete Signup</h3>
                <div className = "form-group">
                    <input
                        type = "text"
                        className = "form-control"
                        placeholder = "Full name"
                        {...register("email")}
                        required
                        style = {styleFloat} />
                </div>
                <div className = "form-group">
                    <label></label>
                    <input
                        type = "tel"
                        className = "form-control"
                        placeholder = "Phone number"
                        {...register("password")}
                        required
                        style = {styleFloat}
                        />
                </div>
                <div><Button> Submit</Button></div>
            </Form >
        </Col >
    </div >);
}
export default Onboard;
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