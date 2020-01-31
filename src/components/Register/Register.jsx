import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required, emailValid, minMaxLengthCreator} from "../../utils/validators";
import {connect} from "react-redux";
import {register} from "../../redux/auth-reduser";
import {Redirect} from "react-router-dom";
import style from "../../common/FormsControls/FormsControls.module.css"
import s from "./Register.module.css"

const validLengthPassword = minMaxLengthCreator(6, 47);
const validLengthName = minMaxLengthCreator(3, 20);


const RegisterForm = (props) => {
    return (
        <form className="form" onSubmit={props.handleSubmit}>
            <h1 className="header">Register</h1>
            <div className="fieldWrapper">
                <Field placeholder={"Name"} name={"name"}
                       validate={[required, validLengthName]}
                       component={Input}/>
            </div>
            <div className="fieldWrapper">
                <Field placeholder={"Email"} name={"email"}
                       validate={[required, emailValid]}
                       component={Input}/>
            </div>
            <div className="fieldWrapper">
                <Field placeholder={"Password"} name={"password"} type={"password"}
                       validate={[required, validLengthPassword]}
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
        props.register(formData.name, formData.email, formData.password);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
    <div className={s.register}>
        <RegisterReduxForm onSubmit={onSubmit} />
    </div>)
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {register} )(Login);