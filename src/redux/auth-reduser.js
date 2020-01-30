import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
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


export const setAuthUserData = (userId, name, isAuth) => ({type: SET_USER_DATA, payload:
        {userId, name, isAuth}  });

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {
            console.log(response)
            if (response.data.resultCode === 0) {
                let {id, name} = response.data.user;
                dispatch(setAuthUserData(id, name, true));
            }
        });
}

export const login = (email, password) => (dispatch) => {
    localStorage.setItem("token", "");
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
                localStorage.setItem("token", "");
            }
        });
}

export const register = (name, email, password) => (dispatch) => {
    authAPI.register(name, email, password)
        .then(response => {
            if (response.data.resultCode === 0) {
                login(email, password);
            } else {
                console.log(response);
                let message = response.data.errors.length > 0 ? response.data.errors[0] : "Some error";
                dispatch(stopSubmit("register", {_error: message}));

            }
        });
}

export default authReducer;