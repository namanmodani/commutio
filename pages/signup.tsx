import React from "react";
import { Col, FloatingLabel, Row, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { app } from './../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Router from "next/router";
import styled from 'styled-components';

const signUp = (
    email: string,
    password: string
) => {
    createUserWithEmailAndPassword(getAuth(app), email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            alert(user);
            window.sessionStorage.setItem("loginEmail", email);
            await Router.push('/home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

};
const SignUp = () => {
    const {  register, handleSubmit } = useForm();
    const onSubmit = async (data: { [x:string]: string }) => {
        console.log(data);
        if (!data.email.includes("@ucla.edu")){
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