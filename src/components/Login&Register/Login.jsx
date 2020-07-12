import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Redirect, NavLink} from "react-router-dom";
import sControls from "../../common/FormsControls/FormsControls.module.css";
import "./Login&Register.scss";


const LoginForm = (props) => {
        return( 
    <form onSubmit={props.handleSubmit}>
        <div className="authorization-registration__input">
            <Field placeholder={"Email"} name={"email"} type={"email"}
                       validate={[required]}
                       component={Input}/>
        </div>
        <div className="authorization-registration__input">
            <Field placeholder={"Password"} name={"password"} type={"password"}
                       validate={[required]}
                       component={Input}/>
        </div>
        { props.error && <div className={sControls.formSummaryError}>{props.error}</div>}
        <div className="authorization-registration__remember-me">
            <Field component={Input} name={"rememberMe"} type={"checkbox"} id="remember" />
            <label for="remember">Remember me</label>   
        </div>
        <div className="authorization-registration__buttons">
            <button disabled={props.isFetching}>Login</button>
            <NavLink to="/register" className="authorization-registration__buttons-sign-up beauty-button">
                Sign Up
            </NavLink>
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
        return <Redirect to={"/dialogs"} />
    }

    return (
        <div className="authorization-registration">
            <div className="authorization-registration__logo">
                <img src="https://www.pngkit.com/png/full/373-3738572_pictures-of-animals-animals-for-logo-png.png" alt="wolf logo"/>
            </div>
            <div className="authorization-registration__form">
                <div className="authorization-registration__form-wrapper">
                    <div className="authorization-registration__info">
                        <h1>Animal's Chat</h1>
                        <p>Welcome Back, Please login to your account.</p>
                    </div>
                    <LoginReduxForm onSubmit={onSubmit} isFetching={props.isFetching} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
})

export default connect(mapStateToProps, {login} )(Login);