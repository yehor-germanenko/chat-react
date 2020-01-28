import React from 'react';
import withAuthRedirect from '../../hoc/withAuthRedirect'
import {compose} from "redux";
import { connect } from 'react-redux';

let Test = () => {
    return (
        <h1>Halo</h1>
    )
}

export default compose(connect(), withAuthRedirect)(Test);