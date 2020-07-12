import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reduser";
import dialogsReducer from "./dialogs-reduser";
import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from './profile-reduser';
import appReducer from './app-reduser'
import { composeWithDevTools } from 'redux-devtools-extension';

let reducerApp = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    dialogs: dialogsReducer,
    form: formReducer,
    app: appReducer
})

let rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return reducerApp(state, action)
}


let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;