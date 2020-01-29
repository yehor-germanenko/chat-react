import React from 'react';
import s from "./Profile.module.css"
/*import userPhoto from "../../assets/images/user.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'*/
import { ProfileUpdateData } from './ProfileContainer';


export default (props) => {
    return (
        <div className={s.profile}>
            <ProfileUpdateData name={props.name} email={props.email} updateData={props.updateData} />
        </div>
    );
}

/*<div className={s.status}>
                    <FontAwesomeIcon icon={faCircle} size="xs"/>Online
                </div>*/