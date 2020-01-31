import React from 'react';
import s from "./Profile.module.css"
import { NavLink } from 'react-router-dom';


export default (props) => {
    return (
        <div className={s.profile}>
            <div className={s.img}>
                <img src={props.avatar} alt=""/>
            </div>
             <div>
                <div className={s.name}>Name: {props.name}</div>
                <div className={s.email}>Email: {props.email}</div>
            </div>
            <div className={s.edit}>
                <NavLink className="button" to={'profile/edit'}>Edit Profile</NavLink>
            </div>
        </div>
    );
}