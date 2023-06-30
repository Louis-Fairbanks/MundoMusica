import React from "react";

function Card(props){
    return <div id="card">
    <div>
    <h1>{props.fName} {props.lName}</h1>
    <h5>{props.located}</h5></div>
    <div>
        <img src={props.photo} alt={props.fName}></img>
        <p>{props.about}</p>
        <p>Age = {props.age} <br/> Joined = {props.joined}</p>
    </div>
    </div>
}

export default Card;