import React, {useState} from "react";
import Cookies from 'universal-cookie';
import jwt from "jwt-decode";

import Middlesignup from "../pages/MiddleSignup";


function SignupPage(){

    const cookies = new Cookies();
    let inputFontSize = {fontSize: "1.5rem"};   //inline styling for size of input font
    const [filledOut, setFilledOut] = useState(false); //boolean to conditionally render MiddleSignup page
    
     const [currentUser, setCurrentUser] = useState(null); //current user state for cookies
    const [usersName, setUsersName] = useState('');

    const [firstName, setFirstName] = useState('');    //input variable for user information
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {firstName, lastName, email, username, password};

        fetch('http://localhost:9000/users', {               //connecting to db, sending user information,
            method: 'POST',                                    // verifying user was created successfully
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }).then(response => response.json()).then(data => {
            let dataMessage = data.message;
            console.log(dataMessage)
            if (dataMessage === "Username already in use. Choose another"){
                return;
            } else if (dataMessage === "User created!"){
                setUsersName(firstName);
                makeJwtToken(user);
                setCurrentUser(user);
                // let sessionName = username + "'s Session 1"
                // let expirationDate = new Date(8.54e15);
                // setCookie(sessionName, 'This is a test cookie', {path: '/', expires: expirationDate})
                return setFilledOut(true);              
            }else return;
    });

    async function makeJwtToken(newUser){
        await fetch('http://localhost:9000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser) 
        }).then(response => response.json()).then(data => {
            console.log(data.accessToken);
            login(data.accessToken);
        })
    }

    function login(jwt_token) {
        const decoded = jwt(jwt_token);

        setCurrentUser(decoded);

        cookies.set('jwt_authorization', jwt_token, {expires : new Date(decoded.expires * 1000)});
    }

    }

    return <div id="signupPage">
    { !filledOut ? <div className="signupContainer">
        <h1 id="signupHeader">Make Music, Together</h1>   
        <form>
            <input style={inputFontSize} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}></input>
            <input style={inputFontSize} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}></input>
            <input style={inputFontSize} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <input style={inputFontSize} placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
            <input type="password" style={inputFontSize} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={handleSubmit} id="getStartedButton">Get Started!</button>
        </form>
     </div> : <Middlesignup firstName={usersName} uniqueUsername={username}/>}
    </div>
}

export default SignupPage;