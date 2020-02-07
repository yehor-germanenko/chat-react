import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import refreshToken from './refresh-token'

const SET_USER_DATA = 'SET_USER_DATA';
const TOGGLE_GET_AUTH_DATA_PROGRESS = 'TOGGLE_GET_AUTH_DATA_PROGRESS';

let initialState = {
    userId: null,
    name: null,
    avatar: null,
    isAuth: false,
    isFetching: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case TOGGLE_GET_AUTH_DATA_PROGRESS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, name, avatar, isAuth) => ({type: SET_USER_DATA, payload: {userId, name, avatar, isAuth}});
export const toggleGetAuthDataProgress = (isFetching) => ({type: TOGGLE_GET_AUTH_DATA_PROGRESS, isFetching})

export const getAuthUserData = () => (dispatch) => {
    if (localStorage.getItem("token")){
        authAPI.me().then(response => {
            refreshToken();
            console.log("succses", response)
            let {id, name, avatar} = response.data.user;
            dispatch(setAuthUserData(id, name, avatar, true));
        }).catch(error => {
            console.log(error.response)
        })
    } else {
        console.log("not working")
    }
}

export const login = (email, password, rememberMe = false) => (dispatch) => {
    dispatch(toggleGetAuthDataProgress(true));
    authAPI.login(email, password, rememberMe).then(response => {
        localStorage.setItem("token", response.data.token);
        console.log("token1", response.data.token);
        dispatch(toggleGetAuthDataProgress(false));
        dispatch(getAuthUserData());
    }).catch(error => {
        dispatch(toggleGetAuthDataProgress(false));
        let message = error.response.data.errors.length > 0 ? error.response.data.errors[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    });
}

export const register = (name, email, password) => (dispatch) => {
    localStorage.removeItem("token");
    dispatch(toggleGetAuthDataProgress(true));
    authAPI.register(name, email, password)
        .then(response => {
            localStorage.setItem("token", response.data.token);
            dispatch(toggleGetAuthDataProgress(false));
            dispatch(getAuthUserData());
        }).catch(error => {
            dispatch(toggleGetAuthDataProgress(false));
            let message = error.response.data.errors.length > 0 ? error.response.data.errors[0] : "Some error";
            dispatch(stopSubmit("register", {_error: message}));
        });
}

export const logout = () => (dispatch) => {
    dispatch(setAuthUserData(null, null, null, false));
    localStorage.removeItem("token");
}

export const deleteUser = () => () => {
    authAPI.deleteUser();
    logout();
}

export default authReducer;