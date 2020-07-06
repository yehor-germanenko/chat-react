import {connect} from 'react-redux';
import Profile from './Profile';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from "redux";
import React from 'react';
import {getUserData} from "../../redux/profile-reduser"
import {logout, getAuthUserData} from '../../redux/auth-reduser'
import Header from '../Header/Header';

class ProfileContainer extends React.Component {
    componentDidMount(){
        this.props.getUserData()
    }

    //logout = () => this.props.logout();

    render() {
        return (
            <div>
                <Header/>
                <Profile id={this.props.id} name={this.props.name} 
                email={this.props.email} avatar={this.props.avatar} logout={this.props.logout}/>
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