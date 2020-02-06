import React from 'react';
import NewMessageForm from './NewMessageForm/NewMessageForm'
import NewUserToRoomForm from './NewUserToRoomForm/NewUserToRoomForm'
//import NewMessageForm from './NewMessageForm';


class MessagesArea extends React.Component {
  componentDidMount (){
    setInterval(() => this.props.getMessages(this.props.roomId), 100);
  }

  getMessages = () => this.props.getMessages(this.props.roomId)

  RemoveUserFromRoom = () => this.props.RemoveUserFromRoom(this.props.userName);

  render () {
    return(
    <div className="messagesArea">
      <div className="Room-Hat">
        <p>{this.props.roomName}</p>
          <div id="Right">
            <NewUserToRoomForm addUserToRoom={this.props.addUserToRoom} roomId={this.props.roomId} />
            <div className="Leave">
                <button onClick={this.RemoveUserFromRoom}>Leave from Room</button>
            </div>
            <div className="Delete-Room">
                <a href="#">DELETE ROOM</a>
            </div>
        </div>
      </div>
      <div className="Messages" id="scroll">
        {this.props.messages.map(message => <div className="Message">
          <div className="Avatar-Message">
            <img src={message.avatar} alt="Avatar" />
          </div>
          <div className="Text-Message">
            <p>{message.message}</p>
          </div>
        </div>)}
      </div>
      <NewMessageForm roomId={this.props.roomId} addMessage={this.props.addMessage} />
  </div>
  )};
};

export default MessagesArea;


