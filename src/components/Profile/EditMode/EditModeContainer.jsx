import {getUserData, updateData, updatePassword} from "../../../redux/profile-reduser"
import EditMode from './EditMode'
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import {connect} from 'react-redux';
import {compose} from "redux";
import {deleteUser, logout} from '../../../redux/auth-reduser'



let mapStateToProps = (state) => {
    return {
        name: state.profile.name,
        email: state.profile.email,
        isAuth: state.auth.isAuth
    }
};

export default compose(connect(mapStateToProps, {getUserData, updateData, updatePassword, deleteUser, logout}))(EditMode);

//withAuthRedirect