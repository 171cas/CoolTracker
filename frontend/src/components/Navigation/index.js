import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginFormPage';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    useEffect(() => {
        if (!sessionUser) {
            const pathname = window.location.pathname //returns the current url minus the domain name
            if (pathname !== '/' || pathname !== '/signup') {
                history.push(`/`)
            }
        }
    }, []);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink exact to="/workouts">My Workouts</NavLink>
                <NavLink exact to="/exercises">My Exercises</NavLink>
                <NavLink exact to="/profile">My Profile</NavLink>
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
