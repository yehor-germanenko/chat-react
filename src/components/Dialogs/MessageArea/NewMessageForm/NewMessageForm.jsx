import React from 'react'
import '../../Dialogs.scss'
import send from '../../../../assets/images/send.svg'


class NewMessageForm extends React.Component {
    state = {
        roomId: this.props.roomId,
        text: ''
    };

    componentWillReceiveProps = nextProps => {
        this.setState({ roomId: nextProps.roomId });
    };
    
    handleChange = e => {
        e.preventDefault();
        this.setState({ text: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.text.length !== 0){
            console.log("send " + this.state.roomId)
            this.props.addMessage(this.props.roomId, this.state.text);
            this.setState({ text: '' });
        }
    };

    render() {
        return (
            <div class="dialogs__input-message">
                <form class="dialogs__input-message-wrapper" onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.text} type="text" name="input" wrap="hard" placeholder="Enter your message..." autoComplete="off" autoFocus/>
                    <button type="submit">
                        <img src={send} alt=""/>
                    </button>
                </form>
            </div>
        )
    }
}

//<form className={s.InputArea} onSubmit={this.handleSubmit} >
              //  <input onChange={this.handleChange} value={this.state.text} type="text" name="input" wrap="hard" placeholder="Type your message here..." autoComplete="off" />
        //    </form>

export default NewMessageForm;