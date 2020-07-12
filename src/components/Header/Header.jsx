import {connect} from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from "redux";
import React from 'react';
import {logout} from '../../redux/auth-reduser'
import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/images/wolf.png'

class Header extends React.Component {
    logout = () => this.props.logout();

    render (){
        return (            
            <div className="header">
                <div className="container">
                    <div className="nav">
                        <div className="header__logo header__item">
                            <NavLink to='/dialogs'>
                                <div>
                                    <img src={logo} alt="logo wolf"/>
                                </div>
                                <div className="header__logo-name header__text">
                                    Animal's <span>chat</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className="header__profile header__item">
                            <NavLink to="/profile">
                                <div className="header__profile-name header__text">
                                    {this.props.userName}
                                </div>
                                <div>
                                    <img src={this.props.avatar} alt="ava"/>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        userName: (state.profile.name === null) ? state.auth.name : state.profile.name,
        avatar: (state.profile.avatar === null) ? state.auth.avatar : state.profile.avatar,
        isAuth: state.auth.isAuth
    }
};
export default compose(connect(mapStateToProps, {logout}), withAuthRedirect)(Header);