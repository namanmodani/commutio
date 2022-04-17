import React, {useState,useEffect} from "react"
import {Col, FloatingLabel, Row, Form, Spinner} from "react-bootstrap";
import TimePicker from 'react-bootstrap-time-picker';
import {Button} from "react-bootstrap";
import { app } from '../firebase';
import {collection, query, where, getDocs, getFirestore} from "firebase/firestore";
import CommuterCard from "../components/commuterCard";
import GeneralButton from "../components/button";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1);
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

const CommuterCards = ({data, email}) => {

    console.log("building...");
    let elements: JSX.Element[] = [];
    let parsedDateWithDistance: {
        email:string,
        location : string,
        time : string,
        distance: number,
        lat: number,
        long: number
    }[] = [];
    const localLat  = window.sessionStorage.getItem("commuterLoginLat") || 0;
    const localLng  = window.sessionStorage.getItem("commuterLoginLong") || 0;
    const localTime = window.sessionStorage.getItem("commuterLoginTime") || "0";

    console.log("local coordinates");
    console.log(localLat);
    console.log(localLng);

    for (let i = 0; i < data.length; i++) {
        if (data[i].email == email) continue;
        const distance = getDistanceFromLatLonInKm(localLat,localLng, data[i].lat,data[i].long);
        const ourHours = Math.floor(   parseInt(localTime) / (3600));
        const theirHours = Math.floor(   parseInt(data[i].time) / (3600));
        console.log("our hours", ourHours, "their hours", theirHours);
        console.log(distance);
        if ((ourHours + 1 == theirHours || ourHours  -  1 == theirHours || ourHours == theirHours)) {
            const obj = {
                email: data[i].email,
                location : data[i].location,
                time : data[i].time,
                distance: distance,
                lat: data[i].lat,
                long: data[i].long
            }
            console.log(obj);
            parsedDateWithDistance.push(obj);
        }
    }

    parsedDateWithDistance.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
    const minLength = Math.min(parsedDateWithDistance.length, 4 )
    for (let i = 0; i < minLength; i++) {
        elements.push(<CommuterCard
            email= {parsedDateWithDistance[i].email}
            distance={parsedDateWithDistance[i].distance.toString()}
            time={parsedDateWithDistance[i].time}
            lat ={parsedDateWithDistance[i].lat}
            long={parsedDateWithDistance[i].long}
        />);
    }
    return <div>{elements}</div>;
};

const commuters = () => {

    const [commuterData, setcommuterData] = useState(
        {loading: false,
                    data: []
                });
    useEffect(() => {
        (async () => {
            try {
                let tempData: any = [];
                const q = query(collection(getFirestore(app), "location"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    let temp = doc.data();
                    tempData.push(temp);
                });
                setcommuterData({
                    loading: true,
                    data : tempData});
                console.log("commuter DATA")
                console.log(commuterData);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);


  return (
    <Col style={{ textAlign: "center", marginBottom:"30px"  }}>
      <h1 style={{
          marginTop: "50px",
          fontSize: "40px",
          color: "#000000",
          fontWeight: "bold",
      }}> Your commuters</h1>

          {commuterData.loading ? (
                  <CommuterCards
                      data ={commuterData.data}
                      email={window.sessionStorage.getItem("commuterLoginEmail")}
                  />
          ) : <Spinner animation="border" /> }
          </Col> );
          }

export default commuters;