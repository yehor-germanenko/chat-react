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
import withAuthRedirect from '../../hoc/withAuthRedirect';

class DialogsContainer extends React.Component {
    state = {
        timer: null
    }

    componentWillMount() {
        this.props.getRooms();
        let timerId = setInterval(() => this.props.getRooms(), 2000);
        this.setState({timer: timerId})
    }

    componentWillUnmount () {
        clearInterval(this.state.timer);
        this.setState({timer: ''})
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
                    <NavLink to="/profile" >
                        <div className="Profile dropdown">
                            <div className="dropdown-child">
                                <div onClick={this.logout}>Log Out</div>
                            </div>
                            <p className="Username">{this.props.userName}</p>
                            <div className="Avatar-profile">
                                <img src={this.props.avatar} alt="Logo" />
                            </div>
                        </div>
                    </NavLink>
                </div>
                <div className={s.Chat}>
                    <Rooms rooms={this.props.rooms} addRoom={this.addRoom} setCurrentRoom={this.props.setCurrentRoom} roomId={this.props.currentRoomId} />

                    {this.props.currentRoomId ? (
                        <MessageArea roomId={this.props.currentRoomId} getMessages={this.props.getMessages} 
                        RemoveUserFromRoom={this.props.RemoveUserFromRoom} addUserToRoom={this.props.addUserToRoom}
                        addMessage={this.props.addMessage} messages={this.props.messages} roomName={this.props.currentRoomName}
                        userName={this.props.userName} setCurrentRoom={this.props.setCurrentRoom} />
                    ) : <div className={s.alternativeText}>Choose or create a room</div>}
                </div>
            </div>
        )
    }
}



let mapStateToProps = (state) => {
    return {
        rooms: state.dialogs.rooms,
        messages: state.dialogs.messages,
        currentRoomId: state.dialogs.currentRoomId,
        currentRoomName: state.dialogs.currentRoomName,
        userName: (state.profile.name === null) ? state.auth.name : state.profile.name,
        avatar: (state.profile.avatar === null) ? state.auth.avatar : state.profile.avatar
    }
};

export default compose(connect(mapStateToProps, {addUserToRoom, RemoveUserFromRoom, addMessage, addRoom, getRooms, getMessages, setCurrentRoom, logout}), withAuthRedirect)(DialogsContainer);