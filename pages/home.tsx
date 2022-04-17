import React, {useState} from "react"
import {Col, FloatingLabel, Row, Form} from "react-bootstrap";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import TimePicker from 'react-bootstrap-time-picker';
import {Button} from "react-bootstrap";
import { app } from './../firebase';
import styled from 'styled-components';
import {doc, getFirestore, setDoc} from "firebase/firestore";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import Router from "next/router";
import fetch from 'node-fetch';
import axios from "axios";
import { margin } from "@mui/system";

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const mapAPIKey = process.env.GOOGLE_MAPS_API_KEY;
const saveToDB= async (
    time,
    location,
    lat,
    long
) => {
    const email  = window.sessionStorage.getItem("loginEmail")  || "no email";

    const id = email ;
    await setDoc(doc(getFirestore(app), "location",id), {
        location: location,
        email: email,
        time: time.toString(),
        lat: lat,
        long: long,
    });
}

function Home() {
    console.log(mapAPIKey);
    const [time, setTime] = useState("12:00");
    const [location, setLocation] = useState("");

    return (
        <Col 
        xs={100}
        >
      <div className="main">
    
        <h1 style = {styleObj}> Find Fellow Commuters </h1>
    
  <div style={{
    width:"320px",
    marginRight:"auto",
    marginLeft:"auto"
}
    }>
          <label style={stylePass}> Enter your destination </label>
          <GooglePlacesAutocomplete
              apiKey = {mapAPIKey}
              selectProps={{

                  onChange: (l)=> {
                      setLocation(l.label);
                      console.log("you selected");
                      console.log(location);
                  },
              }}
          />
    </div>


<label style={stylePass}>
    Select time you want to leave
</label>

<div style = {{
    width: "320px",
    marginRight: "auto",
    marginLeft: "auto"
}}>

<TimePicker
    onChange = {setTime}
    value = {time}
    step = {15}
/>

</div>
          
<Button 
    style = {findButton}
    onClick = {async() => {
        if (location == "")
            alert("Please select a location!");
        else {

            const splitAddress = location.split(' ').join('+');
            const url = "https://maps.googleapis.com/maps/api/geocode/json?address="
                + splitAddress +
                "&key=AIzaSyBsQupatrR8RnumOlovsyF6pC-gW98tgoI";

            const response = await axios.get(url);

            console.log("hello");
            const data : any = await response.data["results"][0]["geometry"]["location"];
            console.log(JSON.stringify(data));
            console.log("hello");

            console.log(location);
            console.log(time);
            console.log(data.lat);
            const lat = data["lat"];
            const long = data["lng"];

           await saveToDB(time, location, lat, long);
           await Router.push("/list");
        }
    }}

> Find Commuters </Button>
      </div>  
      </Col>
    ) ;
  }
  
export default Home;
const findButton = {
    width: '320px',
    height: '50px',
    background: '#000000',
    border: 'none',
    fontFamily: "Inter, sans-serif",
    fontStyle: 'normal',
    fontSize: '18px',
    borderRadius: '10px',
    textAlign: "center",
    color: '#ffffff',
    marginTop: "45px",
    outline: 'none',
} as React.CSSProperties;

const styleObj = {
    fontSize: 36,
    color: "#000000",
    paddingTop: "180px",
    paddingBottom: "-200px",
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