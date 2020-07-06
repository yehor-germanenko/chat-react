import React from 'react'
import sControls from "../../../../common/FormsControls/FormsControls.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../../common/FormsControls/FormsControls";
import {required, emailValid, minMaxLengthCreator} from "../../../../utils/validators";
import {Redirect, NavLink} from "react-router-dom";
import "../EditMode.scss";


const validLengthName = minMaxLengthCreator(3, 20);

const EditEmailNameForm = (props) => {
    return(
        <form className="edit-form__form" onSubmit={props.handleSubmit} >
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
                <Field placeholder={"password"} name={"password"} type={"password"}
                    validate={[required]}
                    component={Input} size="40"/>
            </div>
            { props.error && <div className={sControls.formSummaryError}>{props.error}</div>}
            <button className="edit-form__button" disabled={props.isFetching}>Save</button>
        </form>
    )
}

const EditEmailNameReduxForm =  reduxForm({form: 'update_user_data'})(EditEmailNameForm)


class EmailNameForm extends React.Component {
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
        this.props.updateData(formData.name, formData.email, formData.password, this.Redirect);
    }

    render () {
        
        if (this.state.redirect){
            return <Redirect to={"/profile"} />
        }

        return <div>
            <EditEmailNameReduxForm onSubmit={this.onSubmit} initialValues={this.initialValues} isFetching={this.props.isFetching} />
        </div>
    }
}

export default EmailNameForm;