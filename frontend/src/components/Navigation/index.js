// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <li><NavLink exact to="/workouts">Workouts</NavLink></li>
                <li><ProfileButton user={sessionUser} /></li>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <li><NavLink to="/login">Log In</NavLink></li>
                <li><NavLink to="/signup">Sign Up</NavLink></li>
            </>
        );
    }

    return (
        <ul>
            <li><NavLink exact to="/">Home</NavLink></li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
