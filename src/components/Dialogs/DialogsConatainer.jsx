import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import { RemoveUserFromRoom, addMessage, addRoom, 
getRooms, getMessages, setCurrentRoom} from '../../redux/dialogs-reduser';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import AddRoom from './addNewRoom';
import Header from '../Header/Header';
import MessageAreaContainer from './MessageArea/MessageAreaContainer';
import RoomsContainer from './Rooms/RoomsContainer';
import './Dialogs.scss'

class DialogsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRooms: true,
        };
        this.toggleActiveClassRooms= this.toggleActiveClassRooms.bind(this);
    }

    toggleActiveClassRooms(){
        this.setState(state => ({
            activeRooms: !state.activeRooms
        }));
    }
    
    addRoom = name => this.props.addRoom(name);

    render () {
        return (
            <div className="Dialogs">
                <Header/>
                <div class="container">
                    <div class="dialogs">
                        <div class={this.state.activeRooms ? "dialogs__rooms dialogs__rooms_active" : "dialogs__rooms"}>
                            <AddRoom addRoom={this.props.addRoom} toggleActiveClassRooms={this.toggleActiveClassRooms}/>
                            <RoomsContainer toggleActiveClassRooms={this.toggleActiveClassRooms}/>
                        </div>
                    {this.props.currentRoomId ? (
                        <MessageAreaContainer toggleActiveClassRooms={this.toggleActiveClassRooms}/>
                    ) : <div className="alternativeText" onClick={this.toggleActiveClassRooms}>Choose or create a room</div>}
                    </div>
                </div>
            </div>
        )
    }
}



let mapStateToProps = (state) => {
    return {
        userName: (state.profile.name === null) ? state.auth.name : state.profile.name, 
        currentRoomId: state.dialogs.currentRoomId,
    }
};

export default compose(connect(mapStateToProps, {RemoveUserFromRoom, addMessage, addRoom, getRooms, getMessages, setCurrentRoom}), withAuthRedirect)(DialogsContainer);