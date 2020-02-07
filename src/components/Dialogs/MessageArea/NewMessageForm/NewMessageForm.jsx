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
        this.props.addMessage(this.state.roomId, this.state.text);
        this.setState({ text: '' });
    };

    render() {
        return (
            <form className={s.InputArea} onSubmit={this.handleSubmit} >
                <input onChange={this.handleChange} value={this.state.text} type="text" name="input" wrap="hard" placeholder="Type your message here..." />
            </form>

        )
    }
}

export default NewMessageForm;