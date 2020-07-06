import React from 'react'
import sControls from "../../../../common/FormsControls/FormsControls.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../../common/FormsControls/FormsControls";
import {required, minMaxLengthCreator, emailValid} from "../../../../utils/validators";
import {Redirect} from "react-router-dom";

const validLength = minMaxLengthCreator(6, 47);
const validLengthName = minMaxLengthCreator(3, 20);

const EditPasswordForm = (props) => {

    return(
        <form className="edit-form__form" onSubmit={props.handleSubmit}>
            <div className="edit-form__form-input">
            <Field placeholder={"New name"} name={"name"}
                    validate={[required, validLengthName]}
                    component={Input} size="40"/>
            </div>
            <div className="edit-form__form-input">
            <Field placeholder={"New email"} name={"email"}
                    validate={[required, emailValid]}
                    component={Input} size="40"/>
            </div>
            <div className="edit-form__form-input">
            <Field placeholder={"Current password"} name={"old_password"} type={"password"}
                validate={[required, validLength]}
                component={Input} size="40"/>
            </div>
            <div className="edit-form__form-input">
            <Field placeholder={"New password"} name={"new_password"} type={"password"}
                validate={[required, validLength]}
                component={Input} size="40"/>
            </div>
            { props.error && <div className={sControls.formSummaryError}>{props.error}</div>}
            <button className="edit-form__button">Save</button>
        </form>
    )
}

const EditPasswordReduxForm =  reduxForm({form: 'update_user_password'})(EditPasswordForm);

class PasswordForm extends React.Component {
    state = {
        redirect: false
    }

    initialValues = {
        name: this.props.name,
        email: this.props.email
    }

    Redirect = () => {
        this.setState({
            redirect: true
        })
    }

    onSubmit = (formData) => {
        this.props.updatePassword(formData.name, formData.email, formData.old_password, formData.new_password, this.Redirect);
    }


    render () {

        if (this.state.redirect){
            return <Redirect to={"/profile"} />
        }

        return <div>
            <EditPasswordReduxForm onSubmit={this.onSubmit} initialValues={this.initialValues} />
        </div>
    }
}

export default PasswordForm;