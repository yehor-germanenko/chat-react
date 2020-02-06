import React from 'react';
import AddRoom from './addNewRoom'
import s from './Dialogs.module.css'
import { NavLink } from 'react-router-dom';

let Rooms = (props) => {
    return(
        <div className={s.rooms}>
            {props.rooms.map( r => {
                return <div className={s.buttonClick} key={r.id} onClick={() => props.setCurrentRoom(r.id, r.name)} className={s.room}>{r.name}</div>
            })}
            <AddRoom addRoom={props.addRoom} />
        </div>
    )
}

export default Rooms;