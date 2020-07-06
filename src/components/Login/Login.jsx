import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Redirect, NavLink} from "react-router-dom";
import sControls from "../../common/FormsControls/FormsControls.module.css";
import "./Login.scss";


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

//getAuthUserData={props.getAuthUserData}
//getAuthUserData

/*<div className="authorization-registration">
        <div className="authorization-registration__logo">
            <img src="img/wolf.png" alt="wolf logo">
        </div>
        <div className="authorization-registration__form">
            <div className="authorization-registration__form-wrapper">
                <div className="authorization-registration__info">
                    <h1>Animal's Chat</h1>
                    <p>Welcome Back, Please login to your account.</p>
                </div>
                <form>
                    <div className="authorization-registration__input">
                        <input type="email" placeholder="Email">
                    </div>
                    <div className="authorization-registration__input">
                        <input type="password" placeholder="Password">
                    </div>
                    <div className="authorization-registration__remember-me">
                        <input name="rememberMe" type="checkbox" id="remember" value="">
                        <label for="remember">Remember me</label>   
                    </div>
                    <div className="authorization-registration__buttons">
                        <button>Login</button>
                        <a className="authorization-registration__buttons-sign-up beauty-button" href="./registration.html">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
     */

     /*<form className="Main" onSubmit={props.handleSubmit}>
        <div className="Picture">
            <div className="LineGraph">
            <img src="https://www.pngkit.com/png/full/373-3738572_pictures-of-animals-animals-for-logo-png.png" alt="Logo" />
            </div>
        </div>
        <div className="MainForm">
            <div className="MainFormBody">
                <div className="ChatName">
                    <p>Animal's Chat</p>
                </div>
            <div className="Welcome">
                <p>Welcome Back, Please login to your account.</p>
            </div>
            <div className="Inputs">
            <Field placeholder={"Email"} name={"email"} type={"email"}
                       validate={[required]}
                       component={Input}/><br/>
            <Field placeholder={"Password"} name={"password"} type={"password"}
                       validate={[required]}
                       component={Input}/><br />
                <div className="Remember">
                <div className="RememberMe">
                    <Field component={Input} name={"rememberMe"} type={"checkbox"} id="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                { props.error && <div className={sControls.formSummaryError}>
                {props.error}</div>}
                </div>
                <div className="LoginRegister">
                    <button disabled={props.isFetching} className="Login">Login</button>
                <NavLink to="/register" className="SignUp">
                    SignUp
                </NavLink>
                </div>
            </div>
            </div>
        </div>
    </form>*/