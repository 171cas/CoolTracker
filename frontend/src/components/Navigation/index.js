import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginFormPage';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink exact to="/workouts"><h3>My Workouts</h3></NavLink>
                <NavLink exact to="/exercises"><h3>My Exercises</h3></NavLink>
                <NavLink exact to="/profile"><h3>My Profile</h3></NavLink>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/signup"><h3>Sign Up</h3></NavLink>
            </>
        );
    }

    return (
        <div className='navBar'>
            <NavLink exact to="/"><h3>Home</h3></NavLink>
            {isLoaded && sessionLinks}
            {!sessionUser && <LoginFormPage />}
        </div>
    );
}

export default Navigation;
