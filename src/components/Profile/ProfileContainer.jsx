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
        //console.log("componentDidMount");
        this.props.getUserData()
    }

    logout = () => this.props.logout();

    render() {
        console.log("render");
        return (
            <div>
                <div className="Navbar">
                    <NavLink to='/dialogs'>
                        <div className="Logo">
                            <img src="https://www.pngkit.com/png/full/373-3738572_pictures-of-animals-animals-for-logo-png.png" alt="Logo" />
                            <p>Animal's Chat</p>
                        </div>
                    </NavLink>
                    <div className="Profile dropdown">
                        <div className="dropdown-child">
                            <div onClick={this.logout}>Log Out</div>
                        </div>
                        <p className="Username">{this.props.name}</p>
                        <div className="Avatar-profile">
                            <img src={this.props.avatar} alt="Logo" />
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
    }
};

export default compose(connect(mapStateToProps, {getUserData, logout, getAuthUserData}), withAuthRedirect)(ProfileContainer);

//withAuthRedirect