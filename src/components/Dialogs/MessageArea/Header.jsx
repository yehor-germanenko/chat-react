import React from 'react';
import NewUserToRoomForm from './NewUserToRoomForm/NewUserToRoomForm'
import '../Dialogs.scss'


class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeAddUser: false
    }
    this.toggleActiveAddUser = this.toggleActiveAddUser.bind(this);
  }
  
  RemoveUserFromRoom = (e) => {
    e.preventDefault();
    console.log("in message area");
    this.props.toggleActiveClassRooms();
    this.props.RemoveUserFromRoom(this.props.roomId, this.props.userName);
    this.props.setCurrentRoom(null, null);
  }

  toggleActiveAddUser(){
    this.setState(state => ({
      activeAddUser: !state.activeAddUser
    }));
  }

  render(){
    return(
      <div className="dialogs__header">
        <div onClick={this.props.toggleActiveClassRooms} className="dialogs__header-burger control-button" id="buttonBurger">
            <span></span>
        </div>
        <div className="dialogs__header-room-name">
          {this.props.roomName}
        </div>
        <div className="dialogs__header-control-form">
          <NewUserToRoomForm activeAddUser={this.state.activeAddUser} addUserToRoom={this.props.addUserToRoom} roomId={this.props.roomId} toggleActiveAddUser={this.toggleActiveAddUser}/>
          <div className="dialogs__header-settings-sm-menu-wrapper">
            <div className="dialogs__header-settings control-button">
                <span></span>
            </div>
            <div className="dialogs__header-settings-sm-menu-buttons">
                <button className="dialogs__header-button-sm-add-user" id="buttonAddUser" onClick={this.toggleActiveAddUser}>Add User</button>
                <button onClick={this.RemoveUserFromRoom} className="dialogs__header-button-leave dialogs__header-button dialogs__header-control-item">Leave</button>
            </div>
          </div>
        </div>
      </div>
  );
  }
};

export default Header;


