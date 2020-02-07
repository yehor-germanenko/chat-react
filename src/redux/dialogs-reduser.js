import {chatAPI} from "../api/api";

const SET_ALL_ROOMS = 'SET_ALL_ROOMS';
const SET_MESSAGES = 'SET_MESSAGES';
const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';

let initialState = {
    rooms: [],
    messages: [],
    currentRoomId: null,
    currentRoomName: null
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_ROOMS:
            return {
                ...state,
                rooms: [...action.rooms]
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: [...action.messages]
            };
        case SET_CURRENT_ROOM:
            return {
                ...state,
                currentRoomId: action.roomId,
                currentRoomName: action.roomName
            }
        default:
            return state;
    }
}

export const setAllRooms = (rooms) => ({type: SET_ALL_ROOMS, rooms});
export const setMessages = (messages) => ({type: SET_MESSAGES, messages});
export const setCurrentRoom = (roomId, roomName) => ({type: SET_CURRENT_ROOM, roomId, roomName});


export const addUserToRoom = (id, name) => (dispatch) => {
    chatAPI.addUserToRoom(id, name).then(
        //refreshToken()
        ).catch(error => {
        console.log(error.response.data.errors);
    });
};

export const RemoveUserFromRoom = (id, name) => (dispatch) => {
    chatAPI.RemoveUserFromRoom(id, name).then(
        //refreshToken()
        ).catch(error => {
        console.log(error.response.data.errors);
    });
};

export const addMessage = (id, message) => (dispatch) => {
    chatAPI.addMessage(id, message).then(
        //refreshToken()
        ).catch(error => {
        console.log(error.response.data.errors);
    });
};

export const addRoom = (name) => (dispatch) => {
    chatAPI.addRoom(name).then(response => {
        //refreshToken()
        }).catch(error => {
        console.log(error.response.data.errors);
    });
};

export const getRooms = () => (dispatch) => {
    console.log("getRooms");
    chatAPI.getRooms().then(response => {
        dispatch(setAllRooms(response.data));
    }).catch(error => {
        console.log(error.response.data.errors);
    });
}

export const getMessages = (id) => (dispatch) => {
    chatAPI.getMessages(id).then(response => {
        console.log(response)
        dispatch(setMessages(response.data.message));
    }).catch(error => {
    });
}

export const deleteRoom = (id) => (dispatch) => {
    chatAPI.deleteRoom(id).then().catch(error => {
        console.log(error.response.data.errors);
    });
}



export default dialogsReducer;


//{id: "1", username: "Ruslan", avatar: "https://link_to_avatar", message: "test", created_at: "47.21391231.242.314.234hz"},

//{id: 1, name: 'Hrak'}, {id: 2, name: 'Psina'}