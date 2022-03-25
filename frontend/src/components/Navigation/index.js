import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginFormPage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faDumbbell, faPencil, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
    };

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div className="outterWord">
                    <NavLink exact to="/" className="wordsLink"><h3>Home</h3></NavLink>
                    <NavLink exact to="/workouts" className="wordsLink"><h3>My Workouts</h3></NavLink>
                    <NavLink exact to="/exercises" className="wordsLink"><h3>My Exercises</h3></NavLink>
                    <NavLink exact to="/profile" className="wordsLink"><h3>My Profile</h3></NavLink>
                </div>

                <div className="outterIcon">
                    <NavLink exact to="/" ><FontAwesomeIcon icon={faHouse} onClick={openMenu} className='iconLink' /></NavLink>
                    <NavLink exact to="/workouts"><FontAwesomeIcon icon={faDumbbell} onClick={openMenu} className='iconLink' /></NavLink>
                    <NavLink exact to="/exercises"><FontAwesomeIcon icon={faPencil} onClick={openMenu} className='iconLink' /></NavLink>
                    <NavLink exact to="/profile"><FontAwesomeIcon icon={faUserLarge} onClick={openMenu} className='iconLink' /></NavLink>
                </div>
            </>
        );
    } else {
        sessionLinks = (
            <div className="loggedOut">
                <NavLink exact to="/" className="wordsLink"><h3>Home</h3></NavLink>
                <NavLink to="/signup"><h3>Sign Up</h3></NavLink>
                <NavLink to="/login" className="showLink"><h3>Log In</h3></NavLink>
                <div className="showComp"><LoginFormPage /></div>
            </div>
        );
    }

    return (
        <div className='navBar'>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;
