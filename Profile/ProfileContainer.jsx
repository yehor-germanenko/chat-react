import { connect } from 'react-redux';
import Profile from './Profile'
import withAuthRedirect from '../src/hoc/withAuthRedirect'
import {compose} from "redux";
import React from 'react'


class ProfileContainer extends React.Component{
    componentDidMount(){}

    render(){
        return <Person {...this.props} />
    }
}

class ProfileUpdateData extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState( {
            editMode: true
        } );
    }

    deactivateEditMode() {
        this.setState( {
            editMode: false
        } );
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }

        console.log("componentDidUpdate")
    }

    render() {
        console.log("render")
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode }>{this.props.status || "-------"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={ this.deactivateEditMode.bind(this) } value={this.state.status}/>
                    </div>
                }
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        name: state.auth.name,
        email: state.auth.name,
        image: state.profile.image
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(ProfileContainer);