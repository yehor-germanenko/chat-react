import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    name: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, email, name, isAuth) => ({type: SET_USER_DATA, payload:
        {userId, email, name, isAuth}  });

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {
            console.log(response)
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(response.data.id, response.data.email, response.data.name, true));
            }
        });
}

export const login = (email, password) => (dispatch) => {
    authAPI.login(email, password)
        .then(response => {
            console.log(response)
            if (response.data.resultCode === 0) {
                localStorage.setItem("token", response.data.token);
                dispatch(getAuthUserData());
            } else {
                let message = response.data.errors.length > 0 ? response.data.errors[0] : "Some error";
                dispatch(stopSubmit("login", {_error: message}));

            }
        });
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        });
}

export const register = (name, email, password) => (dispatch) => {
    authAPI.register(name, email, password)
        .then(response => {
            console.log(response);
            if (response.data.resultCode === 0) {
                login(email, password);
            } else {
                console.log(response);
                let message = response.data.errors.length > 0 ? response.data.errors[0] : "Some error";
                dispatch(stopSubmit("register", {_error: message}));

            }
        });
}

export const updateData = (name, email, password) => (dispatch) => {
    authAPI.updateData(name, email, password)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData(name, email, password));
            }
        });
}

export const users = () => (dispatch) => {
    authAPI.users()
        .then(response => {
            console.log(response)
        });
}

export default authReducer;