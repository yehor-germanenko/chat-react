import React from 'react';
import NewMessageForm from './NewMessageForm/NewMessageForm'
import NewUserToRoomForm from './NewUserToRoomForm/NewUserToRoomForm'
import s from '../Dialogs.module.css'
//import NewMessageForm from './NewMessageForm';


class MessagesArea extends React.Component {
  state = {
    timer: null
  }

  componentWillMount (){
    let timerId = setInterval(() => this.props.getMessages(this.props.roomId), 500);
    this.setState({timer: timerId})
    //this.props.getMessages(this.props.roomId)
  }

  componentWillUnmount () {
    clearInterval(this.state.timer);
    this.setState({timer: ''})
}

  getMessages = () => this.props.getMessages(this.props.roomId)

  RemoveUserFromRoom = () => {
    console.log(this.props)
    this.props.RemoveUserFromRoom(this.props.roomId, this.props.userName);
    this.props.setCurrentRoom(null, null);
  }

  render () {
    return(
    <div className={s.RoomBody}>
      <div className={s.RoomHat}>
        <p>{this.props.roomName}</p>
          <div id={s.Right}>
            <NewUserToRoomForm addUserToRoom={this.props.addUserToRoom} roomId={this.props.roomId} />
            <div className={s.Leave}>
                <button onClick={this.RemoveUserFromRoom}>Leave from Room</button>
            </div>
        </div>
      </div>
      <div className={s.Messages} id={s.scroll}>
        {this.props.messages.map(message => <div className={(this.props.userName === message.username) ? `${s.Message} ${s.MyMessage}` : s.Message}>
          <div className={s.AvatarMessage}>
            <img src={message.avatar} alt="Avatar" />
          </div>
          <div className={s.TextMessage}>
            <p>{message.message}</p>
          </div>
        </div>)}
      </div>
      <NewMessageForm roomId={this.props.roomId} addMessage={this.props.addMessage} />
  </div>
  )};
};

export default MessagesArea;


