import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from '@mui/icons-material/Person';

function MyInfo(){
    return <div>
        <div id="personIconDiv">
            <PersonIcon id="noPictureIcon"/>
        <p className="myInfoP">First Name: <EditIcon/></p>
        <p className="myInfoP">Last Name: <EditIcon/></p>
        <p className="myInfoP">Age: <EditIcon/></p>
        <p className="myInfoP">Location: <EditIcon/></p>
        <p className="myInfoP">About: <EditIcon/></p>
            <hr id="accountDivider"/>
        </div>
        <div>
        </div>
    </div>
}

export default MyInfo;