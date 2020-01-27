import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Redirect, NavLink} from "react-router-dom";
import sControls from "../../common/FormsControls/FormsControls.module.css"
import s from "./Login.module.css"

const LoginForm = (props) => {
    return (
        <form className="form" onSubmit={props.handleSubmit}>
            <h1 className="header">Login</h1>
            <div className="fieldWrapper">
                <Field placeholder={"Email"} name={"email"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div className="fieldWrapper">
                <Field placeholder={"Password"} name={"password"} type={"password"}
                       validate={[required]}
                       component={Input}/>
            </div>
            <div className={s.footerLogin}>
                <div className={s.checkboxWrapper}>
                    <Field component={Input} name={"rememberMe"} type={"checkbox"}/>
                    <span>Remember me</span>
                </div>
                <div className={s.createNew}>
                    <NavLink to="/register">
                        Create new account
                    </NavLink>
                </div>
            </div>
            { props.error && <div className={sControls.formSummaryError}>
                {props.error}
            </div>
            }
            <div>
                <button className="button">Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm =  reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
    <div className={s.login}>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>);
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login} )(Login);