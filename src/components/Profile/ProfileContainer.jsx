import {connect} from 'react-redux';
import Profile from './Profile';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import {compose} from "redux";
import React from 'react';

import {getUserData} from "../../redux/profile-reduser"

class ProfileContainer extends React.Component {
    componentDidMount(){
        this.props.getUserData()
    }

    /*componentDidUpdate(){
        this.props.getUserData()
    }*/


    render() {
        console.log("get", this.props);
        return (
            <Profile id={this.props.id} name={this.props.name} 
            email={this.props.email}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        id: state.profile.id,
        name: state.profile.name,
        email: state.profile.email,
    }
};

export default compose(connect(mapStateToProps, {getUserData}), withAuthRedirect)(ProfileContainer);

//withAuthRedirect