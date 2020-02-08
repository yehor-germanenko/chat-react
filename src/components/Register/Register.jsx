import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormsControls/FormsControls";
import {required, emailValid, minMaxLengthCreator} from "../../utils/validators";
import {connect} from "react-redux";
import {register} from "../../redux/auth-reduser";
import {Redirect, NavLink} from "react-router-dom";
import style from "../../common/FormsControls/FormsControls.module.css"

const validLengthPassword = minMaxLengthCreator(6, 47);
const validLengthName = minMaxLengthCreator(3, 20);


const RegisterForm = (props) => {
    return (
        <form className="Main" onSubmit={props.handleSubmit}>
            <div className="Picture">
                <div className="LineGraph">
                <img src="https://www.pngkit.com/png/full/373-3738572_pictures-of-animals-animals-for-logo-png.png" alt="Logo" />
                </div>
            </div>
            <div className="MainForm">
                <div className="MainFormBodyRegister">
                    <div className="ChatName">
                        <p>Animal's Chat</p>
                    </div>
                    <div className="Welcome">
                        <p>Welcome, Please sign up your account.</p>
                    </div>
                    <div className="Inputs">
                            <Field placeholder={"Name"} name={"name"} type={"text"}
                                validate={[required, validLengthName]}
                                component={Input}/><br />
                            <Field placeholder={"Email"} name={"email"} type={"email"}
                                validate={[required, emailValid]}
                                component={Input}/><br />
                            <Field placeholder={"Password"} name={"password"} type={"password"}
                                validate={[required, validLengthPassword]}
                                component={Input}/><br />
                        { props.error && <div className={style.formSummaryError}>
                            {props.error}
                        </div>
                        }
                        <div className="SignUpButton" >
                            <button className="Login" disabled={props.isFetching}>SignUp</button>
                        </div>
                    </div>
                    <div className="ComeBack">
                        <NavLink to='/'>Already have an account? Sign in.</NavLink>
                    </div>
                </div>
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
        <RegisterReduxForm onSubmit={onSubmit} />
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
})

export default connect(mapStateToProps, {register} )(Login);