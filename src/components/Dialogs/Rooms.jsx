import React from 'react';
import AddRoom from './addNewRoom'
import s from './Dialogs.module.css'

let Rooms = (props) => {
    return(
        <div className="AllRooms">
            <AddRoom addRoom={props.addRoom} />
            {props.rooms.map( r => {
                return <div className={ (props.roomId === r.id) ? `${s.Room} ${s.Selected}` : s.Room } key={r.id} onClick={() => props.setCurrentRoom(r.id, r.name)}><p className={s.RoomName}>{r.name}</p></div>
            })}
        </div>
    )
}

export default Rooms;