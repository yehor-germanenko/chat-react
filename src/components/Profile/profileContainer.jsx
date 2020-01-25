import { connect } from 'react-redux';
import Profile from './profile'
import withAuthRedirect from '../../hoc/withAuthRedirect'
import {compose} from "redux";


export default compose(connect(), withAuthRedirect)(Profile);