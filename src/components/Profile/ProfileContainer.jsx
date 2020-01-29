import {connect} from 'react-redux';
import Profile from './Profile';
//import withAuthRedirect from '../../hoc/withAuthRedirect';
import {Redirect} from "react-router-dom"; 
import {compose} from "redux";
import React from 'react';
import sControls from "../../common/FormsControls/FormsControls.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required, emailValid} from "../../utils/validators";
import {getUserData, updateData, updatePassword} from "../../redux/profile-reduser"



let ProfileContainer = (props) => {
    /*componentDidMount(){
        this.props.getUserData();
    };*/

    return(
        <Profile props={props} />
    )
         
}

class ProfileFrom extends React.Component {

    state = {
        editModeEmail: false,
        editModeName: false,
        editModePassword: false
    };

    activateEditMode = (mode) => {
        console.log(mode);
        switch (mode) {
            case "email":
                this.setState( {
                    editModeEmail: true
                });
                break;

            /*case "name":
                this.setState( {
                    editModeName: true
                });
                break;

            case "password":
                this.setState( {
                    editModeName: true
                });
                break;*/

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
                break;

            /*case "name":
                this.setState( {
                    editMode: false
                });

                //this.props.updateStatus(this.state.status);
                break;

            case "password":
                this.setState( {
                    editMode: false
                });

                //this.props.updateStatus(this.state.status);
                break;*/

            default:
                console.log('Wrong edit mode name!');
        }
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                {/*{!this.state.editModeEmail &&
                    <div>
                        <span>{this.props.email}</span>
                        <button onClick={this.activateEditMode(this, "email")} className="button">Change</button>
                    </div>
                }*/}

                {!this.state.editModeEmail &&
                    <div>
                        <div className="fieldWrapper">
                            <Field value={this.props.email} name={"email"}
                                validate={[required, emailValid]}
                                component={Input}/>
                            
                            <Field placeholder={"password"} name={"password"}
                                validate={[required]}
                                component={Input}/>
                        </div>
                        
                        <button name={"emailButton"} className="button" onClick={ this.deactivateEditMode(this, "email")}>Сonfirm changes</button>
                    </div>
                }
            </form>
        )
    };
}
//
/*

{!this.state.editModeEmail &&
                    <div>
                        <span>{this.props.email}</span>
                        <button onClick={this.activateEditMode("email")} className="button">Change</button>
                    </div>
                }

                {this.state.editModeEmail &&
                    <div>
                        <div className="fieldWrapper">
                            <Field value={this.props.email} name={"email"}
                                validate={[required, emailValid]}
                                component={Input}/>
                        </div>
                        
                        <button name={"emailButton"} className="button" onClick={ this.deactivateEditMode("email")}>Сonfirm changes</button>
                    </div>
                }

*/ 

/*{ this.props.error && <div className={sControls.formSummaryError}>
{this.props.error}</div>
}*/

const UpdateReduxForm =  reduxForm({form: 'update_user_data'})(ProfileFrom)

export const ProfileUpdateData = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        props.updateData(props.name, formData.email, formData.password);
    }
    return (
        <div>
            <UpdateReduxForm onSubmit={onSubmit} />
        </div>);
}

let mapStateToProps = (state) => {
    return {
        id: state.profile.id,
        name: state.profile.name,
        email: state.profile.email,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        getUserData: () => {
            dispatch(getUserData());
        },

        updateData: (name, email, password) => {
            dispatch(updateData(name, email, password));
        },

        updatePassword: (oldPassword, newPassword) => {
            dispatch(updatePassword(oldPassword, newPassword));
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), )(ProfileContainer);