import React from 'react'
import sControls from "../../../../common/FormsControls/FormsControls.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../../../common/FormsControls/FormsControls";
import {required, emailValid, minMaxLengthCreator} from "../../../../utils/validators";
import {Redirect} from "react-router-dom";

const validLengthName = minMaxLengthCreator(3, 20);

const EditEmailNameForm = (props) => {
    console.log(props)
    return(
        <form className="form" onSubmit={props.handleSubmit} >
            <div className="fieldWrapper">
            <Field placeholder={"New name"} name={"name"}
                    validate={[required, validLengthName]}
                    component={Input}/>
            </div>
            <div className="fieldWrapper">
                <Field placeholder={"New email"} name={"email"}
                    validate={[required, emailValid]}
                    component={Input}/>
            </div>
            <div className="fieldWrapper">
                <Field placeholder={"password"} name={"password"} type={"password"}
                    validate={[required]}
                    component={Input}/>
            </div>
            { props.error && <div className={sControls.formSummaryError}>{props.error}</div>}
            <button className="button" disabled={props.isFetching}>Save</button>
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