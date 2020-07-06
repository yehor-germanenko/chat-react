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

            /*<div>
                <div className="Navbar">
                    <NavLink to='/dialogs'>
                        <div className="Logo">
                            <img src="https://www.pngkit.com/png/full/373-3738572_pictures-of-animals-animals-for-logo-png.png" alt="Logo" />
                            <p>Animal's Chat</p>
                        </div>
                    </NavLink>
                    <NavLink to="/profile" >
                        <div className="Profile dropdown">
                            <div className="dropdown-child">
                                <div onClick={this.logout}>Log Out</div>
                            </div>
                            <p className="Username">{this.props.userName}</p>
                            <div className="Avatar-profile">
                                <img src={this.props.avatar} alt="ava" />
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>*/
/*
<div class="header">
    <div class="container">
        <div class="nav">
            <div class="header__logo header__item">
                <a href="#">
                    <div>
                        <img src="img/wolf.png" alt="">
                    </div>
                    <div class="header__logo-name header__text">
                        Animal's <span>chat</span>
                    </div>
                </a>
            </div>
            <div class="header__profile header__item">
                <a href="#">
                    <div class="header__profile-name header__text">
                        Profile name
                    </div>
                    <div>
                        <img src="https://gravatar.com/avatar/0296dfca0e02d76686cc9460ea3b1d99.png" alt="">
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>

*/