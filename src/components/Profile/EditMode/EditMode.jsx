import React from 'react'
import EmailNameForm from './EditForms/EditEmailNameForm'
import PasswordForm from './EditForms/EditPasswordForm'
import s from './EditMode.module.css'

export default class Edit extends React.Component {

    state = {
        passw: false
    }

    addPasssw = () => {
        if (!this.passw) {
            this.setState({
                passw: true
            })}
    }

    render (){
        return (<div className={s.editForm}>
            <h1>Edit Mode</h1>
            {!this.state.passw && <div>
                <EmailNameForm name={this.props.name} email={this.props.email} updateData={this.props.updateData} />
                <button className="button" onClick={this.addPasssw}>Change password</button>
                </div>
            }
            {this.state.passw && 
                <PasswordForm name={this.props.name} email={this.props.email} updateData={this.props.updateData} />
            }
        </div>
        )
    }
}