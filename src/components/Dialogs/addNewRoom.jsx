import React from 'react'
import s from './Dialogs.module.css'

class AddRoom extends React.Component {
    state = {
        editMode: false,
        name: null
    }

    activateEditMode = () => {
        this.setState( {
            editMode: true
        } );
    }

    save() {
        this.setState( {
            editMode: false
        } );
        this.props.addRoom(this.state.name);
    }

    deactivateEditMode () {
        this.setState( {
            editMode: false
        });
    }

    onStatusChange = (e) => {
        this.setState({
            name: e.currentTarget.value
        });
    }

    render() {
        return (
            <div className={s.CreateRoom}>
                {!this.state.editMode &&
                    <button onClick={ this.activateEditMode.bind(this) }><p>Create Room</p></button>
                }

                {this.state.editMode &&
                    <div className={s.CreateRoomEdit}>
                        <input onChange={this.onStatusChange} autoFocus={true} placeholder="Room name"/>
                        <div className={s.Buttons}>
                            <button onClick={ this.save.bind(this) }>Save</button>
                            <button onClick={ this.deactivateEditMode.bind(this) }>Cansel</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default AddRoom;