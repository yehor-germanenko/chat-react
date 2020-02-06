import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {addUserToRoom, RemoveUserFromRoom, addMessage, addRoom, 
getRooms, getMessages, setCurrentRoom} from '../../redux/dialogs-reduser';
import {logout} from '../../redux/auth-reduser'
import Rooms from './Rooms';
import s from './Dialogs.module.css'
import MessageArea from './MessageArea/MessageArea'
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class DialogsContainer extends React.Component {
    componentDidMount() {
        console.log(this.props);
        this.props.getRooms()
        setInterval(() => this.props.getRooms(), 100);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentRoom !== this.props.currentRoom) {
            this.render();
        }
    }

    getRooms = () => this.props.getRooms();

    addRoom = name => this.props.addRoom(name);

    logout = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    //setCurrentRoom = id => this.props.setCurrentRoom(id);

    render () {
        return (
            <div className="dialogs">
                <div className="Navbar">
                    <div className="Logo">
                        <img src="https://img.icons8.com/cotton/2x/chat.png" alt="Logo" />
                        <p>Animal's Chat</p>
                    </div>
                    <div className="Profile dropdown">
                        <div className="dropdown-child">
                            <a onClick={logout} href="#">Log Out</a>
                        </div>
                        <p className="Username">{this.props.userName}</p>
                        <span className="chevron" />
                        <NavLink to="/profile" className="Avatar-profile">
                            <img src="https://gravatar.com/avatar/0296dfca0e02d76686cc9460ea3b1d99.png" alt="Logo" />
                        </NavLink>
                    </div>
                </div>

                <Rooms rooms={this.props.rooms} addRoom={this.addRoom} setCurrentRoom={this.props.setCurrentRoom} />

                <h1>{this.props.currentRoom}</h1>
                {this.props.currentRoom ? (
                    <div>
                    <MessageArea roomId={this.props.currentRoomid} getMessages={this.props.getMessages} 
                    RemoveUserFromRoom={this.props.RemoveUserFromRoom} addUserToRoom={this.props.addUserToRoom}
                    addMessage={this.props.addMessage} messages={this.props.messages} roomName={this.props.currentRoomName}
                    userName={this.props.userName} />
                    </div>
                ) : <div className={s.alternativeText}>Choose or create a room</div>}
            </div>
        )
    }
}



let mapStateToProps = (state) => {
    return {
        rooms: state.dialogs.rooms,
        messages: state.dialogs.messages,
        currentRoomId: state.dialogs.currentRoomid,
        currentRoomName: state.dialogs.currentRoomName,
        userName: state.auth.name,
    }
};

export default compose(connect(mapStateToProps, {addUserToRoom, RemoveUserFromRoom, addMessage, addRoom, getRooms, getMessages, setCurrentRoom, logout}), withRouter)(DialogsContainer)


//import withAuthRedirect from '../../hoc/withAuthRedirect';
//withAuthRedirect