import {userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';

let initialState = {
    id: null,
    name: null,
    email: null
};

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, 
                id: action.profile.id,
                name: action.profile.name,
                email: action.profile.email 
            }
        }
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const updateProfileData = (name, email) => ({type: UPDATE_PROFILE_DATA, name, email});


export const getUserData = () => (dispatch) => {
    userAPI.getProfile().then(response => {
        console.log(response)
        dispatch(setUserProfile(response.data.user));
    });
}

export const updateData = (name, email, password) => (dispatch) => {
    userAPI.updateProfile(name, email, password).then( response =>{
        if (response.data.resultCode === 0) {
            dispatch(setUserProfile(name, email));
        } else {
            let message = response.data.errors.length > 0 ? response.data.errors[0] : "Some error";
            dispatch(stopSubmit("update_user_data", {_error: message}));
        } 
    })
}

export const updatePassword = (oldPassword, newPassword) => (dispatch) => {
    userAPI.updatePassword(oldPassword, newPassword).then(response => {
        if (!response.data.resultCode === 0) {
            let message = response.data.errors.length > 0 ? response.data.errors[0] : "Some error";
            dispatch(stopSubmit("update_user_data", {_error: message}));
        }
    })
}

export default profileReducer;