import React from 'react';
import {Redirect} from "react-router-dom";

let Profile = (props) => {
    if (!props.isAuth) return <Redirect to={"/"} /> ;
    return (
    <div>
        <h1>You are in!!</h1>
    </div>
    );
}

export default Profile;