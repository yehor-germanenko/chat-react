import React from 'react'
import "./Dialogs.scss"

class AddRoom extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            activeMobileEdit: false
        };
        this.toggleActiveMobileEdit = this.toggleActiveMobileEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({name: e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.addRoom(this.state.name);
        this.toggleActiveMobileEdit();
        this.setState({ name: '' });
    }

    toggleActiveMobileEdit(){
        this.setState(state => ({
            activeMobileEdit: !state.activeMobileEdit
        }));
    }


    render() {
        return (
            <div className="dialogs__create-room">
                <form className={this.state.activeMobileEdit ? "dialogs__create-room-form dialogs__create-room-form_active" : "dialogs__create-room-form"} onSubmit={this.handleSubmit}>
                    <div className="dialogs__create-room-wrapper">
                        <div className="dialogs__create-room-input space">
                            <input type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter room name"/>
                        </div>
                        <div className="dialogs__create-room-button space">
                            <button type="submit">ADD</button>
                        </div>
                        <div onClick={this.toggleActiveMobileEdit} className="pop-up-buttonX buttonX control-button space" id="buttonXCreateRoom">
                            <span></span>
                        </div>
                    </div>
                </form>
                <div className="dialogs__create-room-button-sm space" id="createRoomButton" onClick={this.toggleActiveMobileEdit}>
                    Create room
                </div>
                <div onClick={this.props.toggleActiveclassNameRooms} className="dialogs__header-buttonX buttonX control-button space" id="buttonXRooms">
                    <span></span>
                </div>
            </div>
        )
    }
}

export default AddRoom;


/*<div classNameName={s.CreateRoom}>
    {!this.state.editMode &&
        <button onClick={ this.activateEditMode.bind(this) }><p>Create Room</p></button>
    }

    {this.state.editMode &&
        <div classNameName={s.CreateRoomEdit}>
            <input onChange={this.onStatusChange} autoFocus={true} placeholder="Room name"/>
            <div classNameName={s.Buttons}>
                <button onClick={ this.save.bind(this) }>Save</button>
                <button onClick={ this.deactivateEditMode.bind(this) }>Cansel</button>
            </div>
        </div>
    }
</div>*/

    /*state = {
        editMode: false,
        name: null
    }

    activateEditMode = () => {
        this.setState( {
            editMode: true
        } );
    }*/

    /*save() {
        this.setState( {
            editMode: false
        } );
        this.props.addRoom(this.state.name);
    }*/

    /*deactivateEditMode () {
        this.setState( {
            editMode: false
        });
    }

    onStatusChange = (e) => {
        this.setState({
            name: e.currentTarget.value
        });
    }*/