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
    const [su, setSu] = useState({});
    const [li, setLi] = useState({});
    //style={{ backgroundColor: 'grey' }}
    const handleClickHo = async (e) => {
        setHo({ color: '#F5E663' })
        setWo({})
        setEx({})
        setPr({})
        setSu({})
        setLi({})
    };
    const handleClickWo = async (e) => {
        setHo({})
        setWo({ color: '#F5E663' })
        setEx({})
        setPr({})
        setSu({})
        setLi({})
    };
    const handleClickEx = async (e) => {
        setHo({})
        setWo({})
        setEx({ color: '#F5E663' })
        setPr({})
        setSu({})
        setLi({})
    };
    const handleClickPr = async (e) => {
        setHo({})
        setWo({})
        setEx({})
        setPr({ color: '#F5E663' })
        setSu({})
        setLi({})
    };
    const handleClickSu = async (e) => {
        setHo({})
        setWo({})
        setEx({})
        setPr({})
        setSu({ color: '#F5E663' })
        setLi({})
    };
    const handleClickLi = async (e) => {
        setHo({})
        setWo({})
        setEx({})
        setPr({})
        setSu({})
        setLi({ color: '#F5E663' })
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
                <NavLink to="/signup" style={su} onClick={handleClickSu}><h3>Sign Up</h3></NavLink>
                <NavLink to="/login" className="showLink" style={li} onClick={handleClickLi}><h3>Log In</h3></NavLink>
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
