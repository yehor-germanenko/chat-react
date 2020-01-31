import {userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';

let initialState = {
    id: null,
    name: null,
    email: null,
    avatar: null
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
                email: action.profile.email,
                avatar: action.profile.avatar
            }
        }

        case UPDATE_PROFILE_DATA: {
            return {
                ...state,
                name: action.profile.name,
                email: action.profile.email
            }
        }
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
//export const updateProfileData = (name, email) => ({type: UPDATE_PROFILE_DATA, name, email});


export const getUserData = () => (dispatch) => {
    userAPI.getProfile().then(response => {
        console.log("getUserData")
        dispatch(setUserProfile(response.data.user));
    });
}

export const updateData = (name, email, password) => (dispatch) => {
    userAPI.updateProfile(name, email, password).then( response =>{
        console.log(name, email, password)
        if (response.data.resultCode === 0) {
            console.log("change email")
            dispatch(setUserProfile(name, email));
        } else {
            console.log(response)
            let message = response.data.errors.length > 0 ? response.data.errors[0] : "Some error";
            dispatch(stopSubmit("update_user_data", {_error: message}));
        } 
    })
}

export const updatePassword = (name, email, oldPassword, newPassword) => (dispatch) => {
    userAPI.updateProfile(name, email, oldPassword, newPassword).then(response => {
        if (response.data.resultCode === 0) {
            console.log("change Password")
            dispatch(setUserProfile(name, email));
        } else {
            console.log(response)
            let message = response.data.errors.length > 0 ? response.data.errors[0] : "Some error";
            dispatch(stopSubmit("update_user_password", {_error: message}));
        }
    })
}



export default profileReducer;