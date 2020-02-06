import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Login from './components/Login/Login'
import Register from'./components/Register/Register'
import Profile from './components/Profile/ProfileContainer';
import Edit from './components/Profile/EditMode/EditModeContainer'
//import Dialogs from '../Dialogs/DialogsConatainer';
import Dialogs from './components/Dialogs/DialogsConatainer'

const App = () => {
  return (
    <div className="app-wrapper">
      <Route exact path='/' render={ () => <Login /> }/>
      <Route exact path='/register' render={ () => <Register /> }/>
      <Route exact path='/profile' render={ () => <Profile /> }/>
      <Route exact path ='/profile/edit' render={() => <Edit /> } />
      <Route exact path ='/dialogs/:roomId?' render={() => <Dialogs /> } />
    </div>
  )
}

export default App;