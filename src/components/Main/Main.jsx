import React from 'react';
import {NavLink} from "react-router-dom";

let Main = (props) => {
    return (
    <div>
        <NavLink to={'/login'}>Login</NavLink>
        <NavLink to={'/register'}>Register</NavLink>
    </div>
    );
}

export default Main;