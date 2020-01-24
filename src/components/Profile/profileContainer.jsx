import { connect } from 'react-redux';
import Profile from './profile'

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = () => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);