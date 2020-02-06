import React from 'react';
import s from "./Profile.module.css"
import { NavLink } from 'react-router-dom';


export default (props) => {

    let logout = () =>{
        props.logout();
    }

    return (
        <div className={s.profile}>
            <div className={s.body}>
                <div className={s.img}>
                    <img src={props.avatar} alt="Omaewa mou shindeiru"/>
                </div>
                <div className={s.info}>
                    <p className={s.infoField}>User info</p>
                    <div className={s.item}>
                        <span>
                            Name:
                        </span>
                        <p>
                            {props.name}
                        </p>
                    </div>
                    <div className={s.item}> 
                        <span>
                            Email:
                        </span> 
                        <p>
                            {props.email}
                        </p>
                    </div>
                </div>
                <div className={s.edit}>
                    <NavLink className={s.button} to={'profile/edit'}>Edit Profile</NavLink>
                </div>
            </div>
            <div className={s.logout}>
                <p className={s.redLogout} onClick={logout}>Log out</p>
            </div>
        </div>
    );
}