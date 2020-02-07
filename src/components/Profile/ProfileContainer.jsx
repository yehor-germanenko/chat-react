import {connect} from 'react-redux';
import Profile from './Profile';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from "redux";
import React from 'react';
import {getUserData} from "../../redux/profile-reduser"
import {logout, getAuthUserData} from '../../redux/auth-reduser'
import { NavLink } from 'react-router-dom';

class ProfileContainer extends React.Component {
    componentDidMount(){
        this.props.getUserData()
    }
    componentDidUpdate(){
        this.props.getUserData()
    }

    logout = () => this.props.logout();

    render() {
        console.log("get", this.props);
        return (
            <div>
                <div className="Navbar">
                    <NavLink to='/dialogs'>
                        <div className="Logo">
                            <img src="https://img.icons8.com/cotton/2x/chat.png" alt="Logo" />
                            <p>Animal's Chat</p>
                        </div>
                    </NavLink>
                    <div className="Profile dropdown">
                        <div className="dropdown-child">
                            <div onClick={this.logout}>Log Out</div>
                        </div>
                        <p className="Username">{this.props.nameAuth}</p>
                        <span className="chevron" />
                        <div className="Avatar-profile">
                            <img src={this.props.avatarAuth} alt="Logo" />
                        </div>
                    </div>
                </div>
                <Profile id={this.props.id} name={this.props.name} 
                email={this.props.email} avatar={this.props.avatar} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        id: state.profile.id,
        name: state.profile.name,
        email: state.profile.email,
        avatar: state.profile.avatar,

        nameAuth: state.auth.name,
        avatarAuth: state.auth.avatar,
    }
};

export default compose(connect(mapStateToProps, {getUserData, logout, getAuthUserData}), withAuthRedirect)(ProfileContainer);

//withAuthRedirect