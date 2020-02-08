import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reduser";
import dialogsReducer from "./dialogs-reduser";
import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from './profile-reduser';

let reducerApp = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    form: formReducer,
    dialogs: dialogsReducer
})

let rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return reducerApp(state, action)
}

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;