import React from 'react';
import s from './Profile.module.css';
import { NavLink } from 'react-router-dom';
import './Profile.scss';


export default (props) => {

    let logout = () => props.logout();

    return (
        <div className="profile">
            <div className="profile__body">
                <div className="profile__avatar">
                    <img src={props.avatar} alt="ava"/>
                </div>
                <div className="profile__info">
                    <p className="profile__info-name">User info</p>
                    <div className="profile__info-item">
                        <span>
                            Name:
                        </span>
                        <p>
                            {props.name}
                        </p>
                    </div>
                    <div className="profile__info-item"> 
                        <span>
                            Email:
                        </span>
                        <p>
                            {props.email}
                        </p>
                    </div>
                </div>
                <div className="profile__buttons">
                    <NavLink to={'profile/edit'}>Edit Profile</NavLink>
                    <div onClick={logout}>Log Out</div>
                </div>
            </div>
        </div>
    );
}