import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reduser";
import dialogsReducer from "./dialogs-reduser";
import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from './profile-reduser';

let reducers = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    form: formReducer,
    dialogs: dialogsReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;
//profile: profileReducer,