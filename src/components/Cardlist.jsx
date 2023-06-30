import React, {useEffect, useState}  from "react";
import Card from "./Card";

function Cardlist(){
    const [users, setUsers] = useState(null);

    useEffect(() => {
        fetch("http://localhost:9000/users").then(res =>{
            return res.json();
        })
        .then((data) =>{
            setUsers(data);
        })
        //if you add event listeners for the rest of the app, add a return statement to be run during cleanup to 
        //make sure that event listeners are not being added every time the app is unmounted, and the resource being watched
        //is changed, thus slowing things down, don't re-add listeners and unsubscribe from apis when you need to change
        //return is basically saying this is the end of the function, let's quit and not keep listening and executing the code
        //because we're refreshing the resources we're watching, so do these things as cleanup
    }, []);

    function createCard(card){
        return <Card 
        key={card.id}
        fName={card.fName} 
        lName={card.lName}
        age={card.age}
        about={card.about}
        photo={card.photo}
        joined={card.joined}
        located={card.located}
        />
    }

    return <div>
        {users&& users.map(createCard)}
    </div>
}

export default Cardlist;