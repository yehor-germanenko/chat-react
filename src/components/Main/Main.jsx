import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Main.module.css';
import '../../App.css';

let Main = () => {
    return (
    <div className="container">
        <div className={s.main}>
            <div className={s.buttons}>
                <NavLink className={`${s.buttonMain} ${"button"}`} to={'/login'}>Login</NavLink>
                <NavLink className={`${s.buttonMain} ${"button"}`} to={'/register'}>Register</NavLink>
            </div>
        </div>
    </div>
    );
}

export default Main;