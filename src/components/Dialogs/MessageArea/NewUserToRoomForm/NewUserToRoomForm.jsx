import React from 'react';
//import s from '../../Dialogs.module.css';
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
            <div class={this.props.activeAddUser ? "dialogs__header-add-user dialogs__header-add-user_active" : "dialogs__header-add-user"}>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="dialogs__header-error-field-wrapper">
                        { this.props.error && <div className="error">{this.props.error}</div>}
                        <div class="dialogs__header-input-new-user dialogs__header-control-form-item">
                            <Field placeholder={"UserName"} type={"text"} name={"text"} id="invite" component={Input}/>
                        </div>
                    </div>
                    <button type="submit" class="dialogs__header-button-add-user dialogs__header-button dialogs__header-control-form-item">AddUser</button>
                    <div class="pop-up-buttonX buttonX control-button space" id="buttonXAddUser" onClick={this.props.toggleActiveAddUser}>
                        <span></span>
                    </div>
                </form>
            </div>
        )
    }
}

const NewUserToRoomReduxForm =  reduxForm({form: 'newUserToRoom'})(NewUserToRoomForm)

const NewUserToRoom = (props) => {
    const onSubmit = (formData) => {
        props.addUserToRoom(props.roomId, formData.text);
    }

    return <NewUserToRoomReduxForm onSubmit={onSubmit} roomId={props.roomId} activeAddUser={props.activeAddUser} toggleActiveAddUser={props.toggleActiveAddUser}/>
}

{/*{ this.props.error && <div className={s.inviteError}>
                {this.props.error}</div>}
                <Field placeholder={"Username"} type={"text"} name={"text"} id="invite" component={Input}/>
                <div className={s.InviteButton}>
                    <button type="submit">+ Add people</button>
                    <form onSubmit={this.props.handleSubmit} >
                <div  class="dialogs__header-input-new-user dialogs__header-control-form-item">
                    <Field placeholder={"UserName"} type={"text"} name={"text"} id="invite" component={Input}/>
                </div>
                <button class="dialogs__header-button-add-user dialogs__header-button dialogs__header-control-form-item" type="submit">Add User</button>
            </form>
        </div>*/}

export default NewUserToRoom;