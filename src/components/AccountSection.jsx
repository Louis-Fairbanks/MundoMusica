import React, {useState} from "react";
// import {HashLink} from "react-router-hash-link";
import MyInfo from "./MyInfo";


function AccountSection(){

   let [scene, setScene] = useState("My Info");

   function handleChange(event){
      setScene(event.target.id);
   }

    return <div id="accountSection">
    <div id="accountSidebarWrapper">
        <div>
           <ul>
                <li onClick={handleChange} id="My Info">My Info</li>
                <li onClick={handleChange} id="My Projects">My Projects</li>
                <li onClick={handleChange} id="Messages">Messages</li>
                <li onClick={handleChange} id="Settings">Settings</li>
           </ul>
        </div>
    </div>
      {scene === "My Info" && <MyInfo/>}
    </div>
}



export default AccountSection;