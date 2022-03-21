import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormPage from '../LoginFormPage';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink exact to="/workouts">Workouts</NavLink>
                <NavLink exact to="/exercises">Exercises</NavLink>
                <ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='navBar'>
            <NavLink exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
            <LoginFormPage />
        </div>
    );
}

export default Navigation;
