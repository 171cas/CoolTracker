import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedLogOutRoute = props => {
    const user = useSelector(state => state.session.user)
    return (
        <Route {...props}>
            {(user) ? <Redirect to='/home' /> : props.children}
        </Route>
    )
};


export default ProtectedLogOutRoute;
