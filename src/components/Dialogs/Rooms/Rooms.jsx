import React from 'react';
import '../Dialogs.scss'

let Rooms = (props) => {
    let setRoom = (r, e) =>{
        e.preventDefault();
        props.setCurrentRoom(r.id, r.name);
        props.toggleActiveClassRooms();
    }
    
    return(
        
        <div className="dialogs__rooms-container">
            {props.rooms.map( r => {
                return <div className={ (props.roomId === r.id) ? "dialogs__room dialogs__room_selected" : "dialogs__room" } key={r.id} onClick={(e) => setRoom(r, e)}>{r.name}</div>
            })}
        </div>
    )
}

export default Rooms;