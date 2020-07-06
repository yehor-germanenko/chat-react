import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {setCurrentRoom, getRooms} from '../../../redux/dialogs-reduser';
import Rooms from './Rooms';
import { getRoomsSelector } from '../../../redux/dialogs-selectors';
import ArraysObjectsComparing from "../../../common/ArraysObjectsComparing/ArraysObjectsComparing"

class RoomsContainer extends React.Component {
    state = {
        timer: null
    }

    componentDidMount() {
        this.props.getRooms();
        let timerId = setInterval(() => this.props.getRooms(), 2000);
        this.setState({timer: timerId})        
    }

    componentWillUnmount () {
        clearInterval(this.state.timer);
        this.setState({timer: ''});
    }

    getRooms = () => this.props.getRooms();

    render () {
        return (
            <Rooms 
                rooms={this.props.rooms} 
                setCurrentRoom={this.props.setCurrentRoom} 
                roomId={this.props.roomId} 
                toggleActiveClassRooms={this.props.toggleActiveClassRooms}/>

        )
    }
}


let mapStateToProps = (state) => {
    return {
        rooms: getRoomsSelector(state),
        roomId: state.dialogs.currentRoomId
    }
};

export default compose(connect(mapStateToProps, {setCurrentRoom, getRooms}))(RoomsContainer);

    /*shouldComponentUpdate(nextProps) {
        return ArraysObjectsComparing(this.props.rooms.slice(), nextProps.rooms.slice())
    }

    shouldComponentUpdate(nextProps) {
        if ((this.props.roomId === nextProps.roomId)) {
            console.log("return false")
            return false
        }
        console.log("return true")
        return true
    }

    shouldComponentUpdate(nextProps) {
        if (!((this.props.roomId == null) && (nextProps.roomId == null))) {
            console.log("return false")
            return false
        }
        console.log("return true")
        return true
    }*/