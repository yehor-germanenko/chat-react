import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reduser";
import {Redirect, NavLink} from "react-router-dom";
import sControls from "../../common/FormsControls/FormsControls.module.css"
import s from "./Login.module.css"
import * as axios from "axios";


const LoginForm = (props) => {

    const Users = (e) => {
        e.preventDefault();
        axios({
          method: 'get',
          url: 'https://animals-chat.herokuapp.com/users',
          headers:     {
            "API-KEY": "3deb2104-0a97-4a6b-8b77-4ec1374c2ee9",
            "Authorization" : "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1ODAzOTE0MzB9.RoSye8s3xINXy7F6OklizMZrte0KlYiYM1dq0mzM6-A"
        }
        }).then( response => {console.log(response)});
    };
    
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
        <button className="button" onClick={Users}>{"{ Get_users }"}</button>
        </form>
    )
}

const LoginReduxForm =  reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    console.log(props)
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password);
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