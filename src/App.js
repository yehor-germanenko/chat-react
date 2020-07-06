import React from 'react';
import './App.scss';
import {Route, withRouter} from "react-router-dom";
import Login from './components/Login/Login'
import Register from'./components/Register/Register'
import Profile from './components/Profile/ProfileContainer';
import Edit from './components/Profile/EditMode/EditModeContainer'
//import Dialogs from '../Dialogs/DialogsConatainer';
import Dialogs from './components/Dialogs/DialogsConatainer'
import {initializeApp} from './redux/app-reduser'
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './common/Preloader/Preloader';

class App extends React.Component{

  componentDidMount (){
    this.props.initializeApp();
  }

  render () {
    if (!this.props.initialized) {
      console.log("initialized " + this.props.initialized);
      return <Preloader/>
    }

    return (
      <div className="app-wrapper">
        <Route exact path='/' render={ () => <Login /> }/>
        <Route exact path='/register' render={ () => <Register /> }/>
        <Route exact path='/profile' render={ () => <Profile /> }/>
        <Route exact path ='/profile/edit' render={() => <Edit /> } />
        <Route exact path ='/dialogs' render={() => <Dialogs /> } />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

export default compose(withRouter(connect(mapStateToProps, {initializeApp})(App)));