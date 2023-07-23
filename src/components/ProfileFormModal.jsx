import React, { useState } from "react";
import "../styles/profileFormModal.css";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function ProfileFormModal(){
    const [username, setUsername] = useState('');
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [about, setAbout] = useState('');
    const [age, setAge] = useState('');
    const [located, setLocated] = useState('');

    const cookies = new Cookies();
    const navigate = useNavigate();
    const jwt_token = cookies.get('jwt_authorization');
    const decoded = jwt(jwt_token);
    const user = decoded.userToUpdate;

    const handleSubmit = () =>{
        const requestedChange = {username, fName, lName, about, age, located};
        const bearerString = 'Bearer ' + jwt_token;
        const databaseURI = 'http://localhost:9000/users/' + user.accountDetails.username;

        fetch(databaseURI, {
            method: 'POST',
            mode: 'cors',
            headers: {"Content-Type": "application/json", 'Authorization': bearerString},
            body: JSON.stringify(requestedChange)
        }).then(response => response.json()).then(data => {
            if(data.message){
                console.log(data.message)
            }
            else if (data.accessToken){
                cookies.remove('jwt_authorization')
                cookies.set('jwt_authorization', data.accessToken)
                return navigate('/account');
            }else{ return;}
    });
    }

    return <div id="profileFormModal">
        <form>
            <h1>Edit Details</h1>
            <div><h4>Username:</h4><input placeholder={user.accountDetails.username} onChange={e => setUsername(e.target.value)}></input></div>
            <div><h4>First Name:</h4><input placeholder={user.fName} onChange={e => setfName(e.target.value)}></input></div>
            <div><h4>Last Name:</h4><input placeholder={user.lName} onChange={e => setlName(e.target.value)}></input></div>
            <div><h4>About:</h4><input placeholder={user.about} onChange={e => setAbout(e.target.value)}></input></div>
            <div><h4>Age:</h4><input placeholder={user.age} onChange={e => setAge(e.target.value)}></input></div>
            <div><h4>Location:</h4><input placeholder={user.located} onChange={e => setLocated(e.target.value)}></input></div>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    </div>
}