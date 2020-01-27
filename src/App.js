import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Login from './components/Login/Login'
import Profile from './components/Profile/profileContainer'
import Register from'./components/Register/Register'

const App = () => {
  return (
    <div className="app-wrapper">
      <Route exact path='/' render={ () => <Login /> }/>

      <Route path='/profile/' render={ () => <Profile /> }/>
      <Route exact path='/register/' render={ () => <Register /> }/>
    </div>
  )
}

export default App;