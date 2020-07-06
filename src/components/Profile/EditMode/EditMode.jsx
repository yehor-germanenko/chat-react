import React from 'react';
import EmailNameForm from './EditForms/EditEmailNameForm';
import PasswordForm from './EditForms/EditPasswordForm';
import { NavLink } from 'react-router-dom';
import './EditMode.scss';

export default class Edit extends React.Component {

    state = {
        passw: false
    }

    addPasssw = () => {
        if (!this.passw) {
            this.setState({
                passw: true
            })
        }
    }

    deleteUser = () => {
        this.props.deleteUser();
        this.props.logout();
    }

    render (){
        return (<div className="edit-form__wrapper">
            <div className="edit-form">
                <NavLink className="edit-form__back-button" to={'/profile'}>
                    <span></span>
                </NavLink>
                <h1>Edit Mode</h1>
                    {!this.state.passw && <div>
                        <EmailNameForm name={this.props.name} email={this.props.email} updateData={this.props.updateData} />
                        <button className="edit-form__button" onClick={this.addPasssw}>Change password</button>
                        </div>
                    }
                    {this.state.passw && 
                        <PasswordForm name={this.props.name} email={this.props.email} updatePassword={this.props.updatePassword} />
                    }
                <div className="edit-form__delete-profile-button edit-form__button" onClick={this.deleteUser}>Delete Profile</div>
            </div>
        </div>
        )
    }
}