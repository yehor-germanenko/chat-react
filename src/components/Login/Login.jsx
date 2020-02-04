import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login, getAuthUserData} from "../../redux/auth-reduser";
import {Redirect, NavLink} from "react-router-dom";
import sControls from "../../common/FormsControls/FormsControls.module.css"
import s from "./Login.module.css"
import * as axios from "axios";


class LoginForm extends React.Component {

    componentDidMount (){
        this.props.getAuthUserData();
    }

    Users = (e) => {
        e.preventDefault();
        axios({
          method: 'get',
          url: 'https://animals-chat.herokuapp.com/users',
          headers:     {
            "API-KEY": "3deb2104-0a97-4a6b-8b77-4ec1374c2ee9",
            "Authorization" : "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE1ODA2NDE1NjN9.roUmSRr3m9VZVFuOoc2A_JtzhPyc0Tj92iTHaFmjtkQ"
        }
        }).then( response => {console.log(response)});
    };
    
    render () {
        console.log(this.props.isFetching)
        return <form className="form" onSubmit={this.props.handleSubmit}>
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
            { this.props.error && <div className={sControls.formSummaryError}>
                {this.props.error}
            </div>
            }
            <div>
                <button disabled={this.props.isFetching} className="button">Login</button>
            </div>
        <button className="button" onClick={this.Users}>{"{ Get_users }"}</button>
        </form>
    }
}

const LoginReduxForm =  reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
    <div className={s.login}>
        <LoginReduxForm onSubmit={onSubmit} getAuthUserData={props.getAuthUserData} isFetching={props.isFetching} />
    </div>);
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
})

export default connect(mapStateToProps, {login, getAuthUserData} )(Login);