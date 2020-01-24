import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Login from './components/Login/Login'
import Profile from './components/Profile/profileContainer'

const App = () => {
    return (
            <div className='app-wrapper'>
              <Login />
              <Route path='/profile/' render={ () => <Profile /> }/>
            </div>
        )
}

export default App;