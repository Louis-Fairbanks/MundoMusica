import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';



function MiddleSignup(props){

    const navigate = useNavigate();
    const cookies = new Cookies();
    
    // const [cookies, setCookie] = useCookies(['login-cookie']);
    const[age, setAge] = useState(null);
    const [about, setAbout] = useState('');
    const [location, setLocation] = useState('');
    const [uniqueUsername] = useState(props.uniqueUsername);
    // const [photo, setPhoto] = useState('');

    const handleOtherSubmit = (e) => {
        e.preventDefault();
        const userInfo = {age, about, location};
        const jwtCookie = cookies.get('jwt_authorization');
        const bearerString = 'Bearer ' + jwtCookie
        
        let databaseURI = 'http://localhost:9000/users/' + uniqueUsername;
        console.log(databaseURI);
        fetch(databaseURI, {
            method: 'POST',
            mode: 'cors',
            headers: {"Content-Type": "application/json", 'Authorization': bearerString},
            body: JSON.stringify(userInfo)
        }).then(response => response.json()).then(data => {
            let dataMessage = data.message;
            console.log(dataMessage)
            if (dataMessage === ("User update unsuccessful")){
                console.log("User update unsuccessful")
                return;
            } else if (dataMessage === "User not found"){
                console.log("User not found")
                return;
            } 
            else if (dataMessage === "User updated!"){
                return navigate('/account');
            }else{ return;}
    });
}
// function getCookies(){
//     const cookies = document.cookie.split(';').reduce((acc, cookie) => {
//         const [name, value] = cookie.trim().split('=');
//         return { ...acc, [name]: value };
//       }, {});
//       return cookies;
// }

    return <div id="middleSignup">
            <h1>Welcome {props.firstName}!</h1>
            <h3>Let's learn a little more about you</h3>  
                <div >
                    <form>
                        <input onChange={(e) => setAge(e.target.value)} placeholder="Age"></input>
                        <input onChange={(e) => setAbout(e.target.value)} placeholder="About"></input>
                        <input onChange={(e) => setLocation(e.target.value)} placeholder="Location"></input>
                        {/* <div className="imgContainer">
                            <input onChange={setPhoto} type="file" accept="image/*"></input>
                        </div> */}
                        <button onClick={handleOtherSubmit}>
                            Submit
                        </button>
                    </form>
                 </div>
            <a href="/account">I'll complete my profile later</a>
    </div> 
}

export default MiddleSignup;