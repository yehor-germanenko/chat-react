import React from 'react'
import sControls from "../../../../common/FormsControls/FormsControls.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../../common/FormsControls/FormsControls";
import {required, minMaxLengthCreator, emailValid} from "../../../../utils/validators";
import {Redirect} from "react-router-dom";

const validLength = minMaxLengthCreator(6, 47);

const EditPasswordForm = (props) => {
    return(
        <form className="form" onSubmit={props.handleSubmit}>
            <div className="fieldWrapper">
            <Field placeholder={"New email"} name={"email"}
                    validate={[required, emailValid]}
                    component={Input}/>
                
                <Field placeholder={"New name"} name={"name"}
                    validate={[required]}
                    component={Input}/>

                <Field placeholder={"Old password"} name={"old_password"} type={"password"}
                    validate={[required]}
                    component={Input}/>
                
                <Field placeholder={"New password"} name={"new_password"} type={"password"}
                    validate={[required, validLength]}
                    component={Input}/>
            </div>
            { props.error && <div className={sControls.formSummaryError}>{props.error}</div>}
            <button className="button" >Save</button>
        </form>
    )
}

const EditPasswordReduxForm =  reduxForm({form: 'update_user_data'})(EditPasswordForm);

class PasswordForm extends React.Component {
    state = {
        redirect: false
    }

    onSubmit = (formData) => {
        this.props.updateData(formData.name, formData.email, formData.old_password, formData.new_password);
        //this.setState({ redirect: true })
    }


    render () {

        if (this.state.redirect){
            return <Redirect to={"/profile"} />
        }

        return <div>
            <EditPasswordReduxForm onSubmit={this.onSubmit} {...this.props}/>
        </div>
    }
}

export default PasswordForm;