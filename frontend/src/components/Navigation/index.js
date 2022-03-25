import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginFormPage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faDumbbell, faPencil, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [click, setClick] = useState('');

    const [ho, setHo] = useState({ color: '#F5E663' });
    const [wo, setWo] = useState({});
    const [ex, setEx] = useState({});
    const [pr, setPr] = useState({});
    //style={{ backgroundColor: 'grey' }}
    const handleClickHo = async (e) => {
        setHo({ color: '#F5E663' })
        setWo({})
        setEx({})
        setPr({})
    };
    const handleClickWo = async (e) => {
        setHo({})
        setWo({ color: '#F5E663' })
        setEx({})
        setPr({})
    };
    const handleClickEx = async (e) => {
        setHo({})
        setWo({})
        setEx({ color: '#F5E663' })
        setPr({})
    };
    const handleClickPr = async (e) => {
        setHo({})
        setWo({})
        setEx({})
        setPr({ color: '#F5E663' })
    };

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div className="outterWord">
                    <NavLink exact to="/" className="wordsLink" style={ho} onClick={handleClickHo}><h3>Home</h3></NavLink>
                    <NavLink exact to="/workouts" className="wordsLink" style={wo} onClick={handleClickWo}><h3>My Workouts</h3></NavLink>
                    <NavLink exact to="/exercises" className="wordsLink" style={ex} onClick={handleClickEx}><h3>My Exercises</h3></NavLink>
                    <NavLink exact to="/profile" className="wordsLink" style={pr} onClick={handleClickPr}><h3>My Profile</h3></NavLink>
                </div>

                <div className="outterIcon">
                    <NavLink exact to="/" ><FontAwesomeIcon icon={faHouse} className='iconLink' style={ho} onClick={handleClickHo} /></NavLink>
                    <NavLink exact to="/workouts"><FontAwesomeIcon icon={faDumbbell} className='iconLink' style={wo} onClick={handleClickWo} /></NavLink>
                    <NavLink exact to="/exercises"><FontAwesomeIcon icon={faPencil} className='iconLink' style={ex} onClick={handleClickEx} /></NavLink>
                    <NavLink exact to="/profile"><FontAwesomeIcon icon={faUserLarge} className='iconLink' style={pr} onClick={handleClickPr} /></NavLink>
                </div>
            </>
        );
    } else {
        sessionLinks = (
            <div className="loggedOut">
                <NavLink exact to="/" className="wordsLink" style={ho} onClick={handleClickHo}><h3>Home</h3></NavLink>
                <NavLink to="/signup" style={wo} onClick={handleClickWo}><h3>Sign Up</h3></NavLink>
                <NavLink to="/login" className="showLink" style={ex} onClick={handleClickEx}><h3>Log In</h3></NavLink>
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
