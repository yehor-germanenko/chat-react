import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required} from "../../utils/validators";
import {connect} from "react-redux";
import {login, getAuthUserData} from "../../redux/auth-reduser";
import {Redirect, NavLink} from "react-router-dom";
import sControls from "../../common/FormsControls/FormsControls.module.css";


class LoginForm extends React.Component {
    componentDidMount (){
        this.props.getAuthUserData();
    }
    
    render () {
        return <form className="Main" onSubmit={this.props.handleSubmit}>
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
                { this.props.error && <div className={sControls.formSummaryError}>
                {this.props.error}</div>}
                </div>
                <div className="LoginRegister">
                    <button disabled={this.props.isFetching} className="Login">Login</button>
                <NavLink to="/register" className="SignUp">
                    SignUp
                </NavLink>
                </div>
            </div>
            </div>
        </div>
    </form>
    }
}

const LoginReduxForm =  reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={"/dialogs"} />
    }

    return (<LoginReduxForm onSubmit={onSubmit} getAuthUserData={props.getAuthUserData} isFetching={props.isFetching} />);
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
})

export default connect(mapStateToProps, {login, getAuthUserData} )(Login);