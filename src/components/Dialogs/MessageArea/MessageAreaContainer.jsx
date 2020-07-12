import {connect} from 'react-redux';
import {compose} from 'redux';
import {addUserToRoom, RemoveUserFromRoom, addMessage,
getRooms, getMessages, setCurrentRoom} from '../../../redux/dialogs-reduser';
import { getMessagesSelector } from '../../../redux/dialogs-selectors';
import React from 'react';
import NewMessageForm from './NewMessageForm/NewMessageForm'
import  '../Dialogs.scss'
import Header from './Header'
import MessagesArea from './MessageArea';
//import ArraysObjectsComparing from '../../../common/ArraysObjectsComparing/ArraysObjectsComparing'


class MessagesAreaContainer extends React.Component {
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


  render () {
    return(
    <div className="dialogs__message-area">
        <Header
                roomName={this.props.roomName} 
                addUserToRoom={this.props.addUserToRoom} 
                roomId={this.props.roomId} 
                RemoveUserFromRoom={this.props.RemoveUserFromRoom}
                setCurrentRoom={this.props.setCurrentRoom}
                userName={this.props.userName}
                toggleActiveClassRooms={this.props.toggleActiveClassRooms}/>
        <MessagesArea 
                messages={this.props.messages}
                userName={this.props.userName} />
        <NewMessageForm 
                roomId={this.props.roomId} 
                addMessage={this.props.addMessage}/>
    </div>
  )};
};


let mapStateToProps = (state) => {
    return {
        messages: getMessagesSelector(state),
        userName: (state.profile.name === null) ? state.auth.name : state.profile.name, 
        roomId: state.dialogs.currentRoomId,
        roomName: state.dialogs.currentRoomName
    }
};

export default compose(connect(mapStateToProps, {addUserToRoom, RemoveUserFromRoom, addMessage, getRooms, getMessages, setCurrentRoom}))(MessagesAreaContainer);