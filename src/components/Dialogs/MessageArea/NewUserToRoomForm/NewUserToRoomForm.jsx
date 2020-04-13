import React from 'react';
import s from '../../Dialogs.module.css';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../../common/FormsControls/FormsControls";

class NewUserToRoomForm extends React.Component {
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.roomId !== this.props.roomId) {
            const { reset } = this.props
            reset();
        }
    };

    render() {
        return (
            <form className={s.Invite} onSubmit={this.props.handleSubmit} >
                { this.props.error && <div className={s.inviteError}>
                {this.props.error}</div>}
                <Field placeholder={"Username"} type={"text"} name={"text"} id="invite" component={Input}/>
                <div className={s.InviteButton}>
                    <button type="submit">+ Add people</button>
                </div>
            </form>
        )
    }
}

const NewUserToRoomReduxForm =  reduxForm({form: 'newUserToRoom'})(NewUserToRoomForm)

const NewUserToRoom = (props) => {
    const onSubmit = (formData) => {
        props.addUserToRoom(props.roomId, formData.text);
    }

    return (<NewUserToRoomReduxForm onSubmit={onSubmit} roomId={props.roomId}/>)
}


/*

    componentWillReceiveProps = nextProps => {
        this.setState({ roomId: nextProps.roomId });
    };
    handleChange = e => this.setState({ text: e.target.value });

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ text: "" });
        this.props.addUserToRoom(this.state.roomId, this.state.text);
    };
*/

export default NewUserToRoom;