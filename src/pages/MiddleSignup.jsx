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
            if (data.message){
                console.log(data.message)
            } else if(data.accessToken){
                console.log(data.accessToken)
                cookies.remove('jwt_authorization')
                cookies.set('jwt_authorization', data.accessToken)
                return navigate('/account');
            }
            else{ return;}
    });
}

    return <div id="middleSignup">
            <h1>Welcome {props.firstName}!</h1>
            <h3>Let's learn a little more about you</h3>  
                <div >
                    <form>
                        <input onChange={(e) => setAge(e.target.value)} placeholder="Age"></input>
                        <input onChange={(e) => setAbout(e.target.value)} placeholder="About"></input>
                        <input onChange={(e) => setLocation(e.target.value)} placeholder="Location"></input>                   
                        <input type="file" accept="image/*"></input>
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