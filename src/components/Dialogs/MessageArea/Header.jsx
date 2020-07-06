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
      <div class="dialogs__header">
        <div onClick={this.props.toggleActiveClassRooms} class="dialogs__header-burger control-button" id="buttonBurger">
            <span></span>
        </div>
        <div class="dialogs__header-room-name">
          {this.props.roomName}
        </div>
        <div class="dialogs__header-control-form">
          <NewUserToRoomForm activeAddUser={this.state.activeAddUser} addUserToRoom={this.props.addUserToRoom} roomId={this.props.roomId} toggleActiveAddUser={this.toggleActiveAddUser}/>
          <div class="dialogs__header-settings-sm-menu-wrapper">
            <div class="dialogs__header-settings control-button">
                <span></span>
            </div>
            <div class="dialogs__header-settings-sm-menu-buttons">
                <button class="dialogs__header-button-sm-add-user" id="buttonAddUser" onClick={this.toggleActiveAddUser}>Add User</button>
                <button onClick={this.RemoveUserFromRoom} class="dialogs__header-button-leave dialogs__header-button dialogs__header-control-item">Leave</button>
            </div>
          </div>
        </div>
      </div>
  );
  }
};

/*<div className={s.RoomHat}>
  <p>{this.props.roomName}</p>
    <div id={s.Right}>
      <NewUserToRoomForm addUserToRoom={this.props.addUserToRoom} roomId={this.props.roomId} />
      <div className={s.Leave}>
          <button onClick={RemoveUserFromRoom}>Leave from Room</button>
      </div>
  </div>
</div>*/
{/*<div class="dialogs__header-add-user-form">
                <div class="dialogs__header-add-user-form-wrapper">
                    <div class="dialogs__header-add-user-form-input space">
                        <input type="text" placeholder="UserName"/>
                    </div>
                    <div class="dialogs__header-add-user-form-button space">
                        <button type="submit">ADD</button>
                    </div>
                    <div class="pop-up-buttonX buttonX control-button space" id="buttonXAddUser">
                        <span></span>
                    </div>
                </div>
            </div>*/}

export default Header;


