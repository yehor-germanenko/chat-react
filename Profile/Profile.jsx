import React from 'react';
import s from "./Profile.module.css"
import userPhoto from "../../assets/images/user.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


let Profile = (props) => {
    return (
        <div className={s.profile}>
            <div className={s.image}>
                <img src={props.image != null ? props.image : userPhoto}/>
            </div>
            <div className={s.info}>
                <div className={s.status}>
                    <FontAwesomeIcon icon={faCircle} size="xs"/>Online
                </div>
                <div className={s.name}>
                    {props.name}
                </div>
                <div className={s.email}>
                    {props.email}
                </div>
                <div className={`${s.button} ${"button"}`}>
                    Update Data
                </div>
            </div>
        </div>
    );
}

export default Profile;