import {connect} from 'react-redux';
import Profile from './Profile';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from "redux";
import React from 'react';
import sControls from "../../common/FormsControls/FormsControls.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required, emailValid} from "../../utils/validators";
import {getUserData, updateData, updatePassword} from "../../redux/profile-reduser"

class ProfileContainer extends React.Component {
    componentDidMount(){
        this.props.getUserData();
    }

    render() {
        console.log("get", this.props);
        return (
            <Profile id={this.props.id} name={this.props.name} 
            email={this.props.email} getUserData={this.props.getUserData} 
            updateData={this.props.updateData} updatePassword={this.props.updatePassword}/>
        )
    }
}

class ProfileFrom extends React.Component {

    state = {
        editModeEmail: false,
    };

    activateEditMode = (mode) => {
        switch (mode) {
            case "email":
                this.setState( {
                    editModeEmail: true
                });
                break;

            case "name":
                this.setState( {
                    editModeName: true
                });
                break;

            case "password":
                this.setState( {
                    editModeName: true
                });
                break;

            default:
                console.log('Wrong edit mode name!');
        }
    };

    deactivateEditMode(mode) {
        switch (mode) {
            case "email":
                this.setState( {
                    editModeEmail: false
                });
                console.log("mode1", this.props)
                this.props.Changes(mode)
                break;

            case "name":
                this.setState( {
                    editMode: false
                });
                break;

            case "password":
                this.setState( {
                    editMode: false
                });
                break;

            default:
                console.log('Wrong edit mode name!');
        }
    };

    render() {

        console.log("email_form", this.props.email)
        return (
            <form onSubmit={this.props.handleSubmit}>
                {!this.state.editModeEmail &&
                    <div>
                        <span>{this.props.email}</span>
                        <button onClick={this.activateEditMode.bind(this, "email")} className="button">Change</button>
                    </div>
                }

                {this.state.editModeEmail &&
                    <div>
                        <div className="fieldWrapper">
                            <Field placeholder={"New email"} name={"email"}
                                validate={[required, emailValid]}
                                component={Input}/>
                            
                            <Field placeholder={"password"} name={"password"} type={"password"}
                                validate={[required]}
                                component={Input}/>
                        </div>
                        { this.props.error && <div className={sControls.formSummaryError}>{this.props.error}</div>}
                        <button name={"emailButton"} className="button" onClick={ this.deactivateEditMode.bind(this, "email") } >Сonfirm changes</button>
                    </div>
                }
            </form>
        )
    };
}
//onClick={ this.deactivateEditMode.bind(this, "email") }

const UpdateReduxForm =  reduxForm({form: 'update_user_data'})(ProfileFrom)

export class ProfileUpdateData extends React.Component {
    constructor(props) {
        super(props);
        
        this.data = null;
    }

    onSubmit = (formData) => {
        this.data = formData;
        //this.props.updateData(this.props.name, this.data.email, this.data.password);
    }

    Changes = (mode) => {
        if (mode === "email"){
            this.props.updateData(this.props.name, this.data.email, this.data.password);
        }
    }

    render () {
        return (
        <div>
            <UpdateReduxForm onSubmit={this.onSubmit} Changes={this.Changes}  {...this.props}/>
        </div>
        )
    };
}

let mapStateToProps = (state) => {
    return {
        id: state.profile.id,
        name: state.profile.name,
        email: state.profile.email,
    }
};

export default compose(connect(mapStateToProps, {getUserData, updateData, updatePassword}), withAuthRedirect)(ProfileContainer);