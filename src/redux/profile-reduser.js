import {userAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import refreshToken from './refresh-token'

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';
const TOGGLE_GET_DATA_PROGRESS = 'TOGGLE_GET_DATA_PROGRESS';

let initialState = {
    id: null,
    name: null,
    email: null,
    avatar: null,
    isFetching: false
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

        case TOGGLE_GET_DATA_PROGRESS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const toggleGetProfileDataProgress = (isFetching) => ({type: TOGGLE_GET_DATA_PROGRESS, isFetching})


export const getUserData = () => (dispatch) => {
    userAPI.getProfile().then(response => {
        dispatch(setUserProfile(response.data.user));
        refreshToken();
    });
}

export const updateData = (name, email, password, Redirect) => (dispatch) => {
    dispatch(toggleGetProfileDataProgress(true));
    userAPI.updateProfile(name, email, password).then( response =>{
        refreshToken();
        dispatch(toggleGetProfileDataProgress(false));
        Redirect();
        dispatch(setUserProfile(name, email));
    }).catch(error => {
        refreshToken();
        dispatch(toggleGetProfileDataProgress(false));
        let message = error.response.data.errors.length > 0 ? error.response.data.errors : "Some error";
        dispatch(stopSubmit("update_user_data", {_error: message}));
    });
}

export const updatePassword = (name, email, oldPassword, newPassword, Redirect) => (dispatch) => {
    dispatch(toggleGetProfileDataProgress(true));
    userAPI.updateProfile(name, email, oldPassword, newPassword).then(response => {
        refreshToken();
        dispatch(toggleGetProfileDataProgress(false));
        Redirect();
        dispatch(setUserProfile(name, email));
    }).catch(error => {
        refreshToken();
        dispatch(toggleGetProfileDataProgress(false));
        let message = error.response.data.errors.length > 0 ? error.response.data.errors[0] : "Some error";
        dispatch(stopSubmit("update_user_password", {_error: message}));
    })
}

export default profileReducer;