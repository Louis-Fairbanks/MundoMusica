import React from "react";
import MundoMusicaLogo from "../images/MundoMusicaLogo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header(){
    return <nav>
    <img id="logo" src={MundoMusicaLogo} alt="Mundo Musica Logo"></img>
        <ol>
            <li>
                Browse
            </li>
            <li>
                About
            </li>
            <li>
                My Account <AccountCircleIcon/>
            </li>
        </ol>
    </nav>
}

export default Header;