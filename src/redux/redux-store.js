import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reduser";
import {applyMiddleware, combineReducers, createStore} from "redux";

let reducers = combineReducers({
    auth: authReducer,
    form: formReducer   
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;
//profile: profileReducer,