import { border, width } from "@mui/system";
import React, { FunctionComponent } from "react";
import { Button } from "react-bootstrap";

const style = {

    width: '',
    height: '',

    background: '#',
    border: '',
    fontFamily: "",
    fontStyle: '',
    fontWeight: '',
    fontSize: '',
    borderRadius: '',
    textTransform: '',
    textAlign: "",
    color: '',
    marginTop: "",
    outline: '',
    boxShadow: ""

} as React.CSSProperties;


const GeneralButton: FunctionComponent<{ name: string, className?: string, href?: string, onclick?: any, type?: string }> = props => {

    const type = props.type === "button" || props.type === "submit" || props.type === "reset" || props.type === undefined ? props.type : undefined;
    return (
        <Button
            className = {props.className}
            href = {props.href}
            onClick = {() => props.onclick}
            type = {type}
            style = {style}
        >
            <p style = {{ margin: "auto" }}>{props.name}</p>
        </Button >
    );
}

export default GeneralButton;