import React from "react";
import SearchIcon from '@mui/icons-material/Search';


function Searchbar(){

    return <div id="searchbar">
        <h3>Connect with other musicians!</h3>
        <form>
            <input style={{fontSize: '1.4rem', fontFamily: 'sans-serif'}}placeholder="Try it out!"></input>
            <button><SearchIcon id="searchIcon"></SearchIcon></button>
        </form>
    </div>
}

export default Searchbar;