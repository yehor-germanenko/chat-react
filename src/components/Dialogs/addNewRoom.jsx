import React from 'react'


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

    deactivateEditMode() {
        this.setState( {
            editMode: false
        } );
        this.props.addRoom(this.state.name);
    }

    onStatusChange = (e) => {
        this.setState({
            name: e.currentTarget.value
        });
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <button className="button" onClick={ this.activateEditMode.bind(this) }>Add room</button>
                    </div>
                }

                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} placeholder="Room name"/>
                        <button className="button" onClick={ this.deactivateEditMode.bind(this) }>Save</button>
                    </div>
                }
            </div>
        )
    }
}

export default AddRoom;