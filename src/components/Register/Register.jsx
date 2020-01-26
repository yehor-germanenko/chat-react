import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required, emailValid} from "../../utils/validators";
import {connect} from "react-redux";
import {register} from "../../redux/auth-reduser";
import {Redirect} from "react-router-dom";
import style from "../../common/FormsControls/FormsControls.module.css"

const RegisterForm = (props) => {
    return (
        <form className="form" onSubmit={props.handleSubmit}>
            <h1 className="header">Register</h1>
            <div>
                <Field className="fieldWrapper" placeholder={"Name"} name={"name"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field className="fieldWrapper" placeholder={"Status"} name={"status"} type={"text"} component={Input}/>
            </div>
            <div>
                <Field className="fieldWrapper" placeholder={"Email"} name={"email"}
                       validate={[required, emailValid]}
                       component={Input}/>
            </div>
            <div>
                <Field className="fieldWrapper" placeholder={"Password"} name={"password"} type={"password"}
                       validate={[required]}
                       component={Input}/>
            </div>
            { props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button className="button">Register</button>
            </div>
        </form>
    )
}

const RegisterReduxForm =  reduxForm({form: 'register'})(RegisterForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.register(formData.email, formData.password, formData.name, formData.status);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <RegisterReduxForm onSubmit={onSubmit} />
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {register} )(Login);