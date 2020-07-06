import React from 'react';
import NewMessageForm from './NewMessageForm/NewMessageForm'
import NewUserToRoomForm from './NewUserToRoomForm/NewUserToRoomForm'
//import s from '../Dialogs.module.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import '../Dialogs.scss'

let MessagesArea = (props) => {
  console.log("message area")
  return(
    <ScrollToBottom className="dialogs__messages" >
        {props.messages.map(message => <div key={message.id} className="dialogs__message">
          <div className="dialogs__message-avatar">
            <img src={message.avatar} alt="Avatar"/>
          </div>
          <div className={(props.userName === message.username) ? "dialogs__message-text dialogs__my-message" : "dialogs__message-text"}>
            {(props.userName !== message.username) &&  <p>{message.username}</p>}
            {message.message}
          </div>
        </div>)}
    </ScrollToBottom>
  )
}
export default MessagesArea;




/*class MessagesArea extends React.Component {
  state = {
    timer: null
  }

  componentDidMount (){
    let timerId = setInterval(() => this.props.getMessages(this.props.roomId), 500);
    this.setState({timer: timerId});
  }

  componentWillUnmount () {
    clearInterval(this.state.timer);
    this.setState({timer: ''})
  }

  getMessages = () => this.props.getMessages(this.props.roomId)

  RemoveUserFromRoom = () => {
    console.log("in message area")
    this.props.RemoveUserFromRoom(this.props.roomId, this.props.userName);
    this.props.setCurrentRoom(null, null);
  }

  render () {
    window.onload = function(){
      document.getElementById('scroll').scrollTop = 9999;
    }
    console.log("render message area")
    return(
    <div className={s.RoomBody}>
      <div className={s.RoomHat}>
        <p>{this.props.roomName}</p>
          <div id={s.Right}>
            <NewUserToRoomForm addUserToRoom={this.props.addUserToRoom} roomId={this.props.roomId} />
            <div className={s.Leave}>
                <button onClick={() => this.RemoveUserFromRoom()}>Leave from Room</button>
            </div>
        </div>
      </div>
      <ScrollToBottom className={s.Messages} >
        {this.props.messages.map(message => <div key={message.id} className={(this.props.userName === message.username) ? `${s.Message} ${s.MyMessage}` : s.Message}>
          <div className={s.AvatarMessage}>
            <img src={message.avatar} alt="Avatar" />
          </div>
          <div className={s.TextMessage}>
            {(this.props.userName !== message.username) &&  <h5>{message.username}</h5>}
            <p>{message.message}</p>
          </div>
        </div>)}
      </ScrollToBottom>
      <NewMessageForm roomId={this.props.roomId} addMessage={this.props.addMessage} />
  </div>
  )};
};*/

