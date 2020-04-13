import {chatAPI} from "../api/api";
import refreshToken from './refresh-token';
import {reset, stopSubmit} from 'redux-form';

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
    chatAPI.addUserToRoom(id, name).then( response => {
        refreshToken();
        dispatch(reset("newUserToRoom"));
        }).catch(error => {
        let message = error.response.data.errors.length > 0 ? error.response.data.errors[0] : "Some error";
        dispatch(stopSubmit("newUserToRoom", {_error: message}));
    });
};

export const RemoveUserFromRoom = (id, name) => () => {
    chatAPI.RemoveUserFromRoom(id, name).then(
        refreshToken()
        ).catch(error => {
        console.log(error.response.data.errors);
    });
};

export const addMessage = (id, message) => () => {
    chatAPI.addMessage(id, message).then(
        refreshToken()
        ).catch(error => {
        console.log(error.response.data.errors);
    });
};

export const addRoom = (name) => () => {
    chatAPI.addRoom(name).then(
        refreshToken()
        ).catch(error => {
        console.log(error.response.data.errors);
    });
};

export const getRooms = () => (dispatch) => {
    chatAPI.getRooms().then(response => {
        dispatch(setAllRooms(response.data));
    }).catch(error => {
        console.log(error.response.data.errors);
    });
}

export const getMessages = (id) => (dispatch) => {
    chatAPI.getMessages(id).then(response => {
        dispatch(setMessages(response.data.message));
    }).catch(error => {
        console.log(error.response.data.errors);
    });
}

export default dialogsReducer;