import { border, width } from "@mui/system";
import React, { FunctionComponent } from "react";
import { Button } from "react-bootstrap";

const style = {

    width: '275px',
    height: '60px',
    background: '#000000',
    border: 'none',
    fontFamily: "Inter, sans-serif",
    fontStyle: 'normal',
    fontSize: '24px',
    paddingTop: '10px',
    borderRadius: '10px',
    textAlign: "center",
    color: '#ffffff',
    marginTop: "14px",

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
