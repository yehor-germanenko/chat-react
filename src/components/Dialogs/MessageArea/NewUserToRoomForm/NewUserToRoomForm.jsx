import React from 'react'
import s from '../../Dialogs.module.css'


class NewUserToRoomForm extends React.Component {
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
        this.props.addUserToRoom(this.state.roomId, this.state.text);
    };

    render() {
        return (
            <form className={s.Invite} onSubmit={this.handleSubmit} >
                <input onChange={this.handleChange} value={this.state.text} type="text" name="invite" id="invite" placeholder="Username"/>
                <div className={s.InviteButton}>
                    <input type="submit" value="+ Add people"/>
                </div>
            </form>

        )
    }
}

export default NewUserToRoomForm;