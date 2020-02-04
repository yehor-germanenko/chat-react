import {connect} from 'react-redux';
import Profile from './Profile';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from "redux";
import React from 'react';
import {getUserData} from "../../redux/profile-reduser"
import {logout} from '../../redux/auth-reduser'

class ProfileContainer extends React.Component {
    componentDidMount(){
        this.props.getUserData()
    }
    componentDidUpdate(){
        this.props.getUserData()
    }

    render() {
        console.log("get", this.props);
        return (
            <Profile id={this.props.id} name={this.props.name} 
            email={this.props.email} avatar={this.props.avatar} logout={this.props.logout} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        id: state.profile.id,
        name: state.profile.name,
        email: state.profile.email,
        avatar: state.profile.avatar
    }
};

export default compose(connect(mapStateToProps, {getUserData, logout}), withAuthRedirect)(ProfileContainer);

//withAuthRedirect