import React from 'react'
import s from '../../Dialogs.module.css'


class NewMessageForm extends React.Component {
    state = {
        roomId: this.props.roomId,
        text: ''
    };

    componentWillReceiveProps = nextProps => {
        this.setState({ roomId: nextProps.roomId });
    };
    
    handleChange = e => this.setState({ text: e.target.value });

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ text: "" });
        this.props.addMessage(this.state.roomId, this.state.text);
    };

    render() {
        return (
            <form className={s.Input_Area} onSubmit={this.handleSubmit} >
                <input onChange={this.handleChange} type="text" name="input" wrap="hard" maxLength={700} placeholder="Type your message here..." id="message-input"/>
            </form>

        )
    }
}

export default NewMessageForm;