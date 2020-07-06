import { createSelector } from "reselect";

const getRooms = (state) => {
    return state.dialogs.rooms;
}

export const getRoomsSelector = createSelector(getRooms, (rooms) => {
    return rooms;
})

const getMessages = (state) => {
    return state.dialogs.messages;
}

export const getMessagesSelector = createSelector(getMessages, (messages) => {
    return messages;
})

/*
currentRoomId: state.dialogs.currentRoomId,
currentRoomName: state.dialogs.currentRoomName
*/