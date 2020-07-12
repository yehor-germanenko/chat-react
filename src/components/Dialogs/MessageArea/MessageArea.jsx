import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../Dialogs.scss'

let MessagesArea = (props) => {
  return(
    <ScrollToBottom className="dialogs__messages" followButtonClassName="dialogs__down-button" scrollViewClassName="AF  ">
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