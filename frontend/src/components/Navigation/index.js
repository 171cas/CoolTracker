import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormNav from '../LoginFormNav';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faDumbbell, faPencil, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const location = useLocation();

    const [ho, setHo] = useState({ color: '#F5E663' });
    const [wo, setWo] = useState({});
    const [ex, setEx] = useState({});
    const [pr, setPr] = useState({});
    const [su, setSu] = useState({});
    const [li, setLi] = useState({});
    const [myUrl, setMyUrl] = useState(location.pathname)



    const handleClickHo = () => {
        setHo({ color: '#F5E663' })
        setWo({})
        setEx({})
        setPr({})
        setSu({})
        setLi({})
    };
    const handleClickWo = () => {
        setHo({})
        setWo({ color: '#F5E663' })
        setEx({})
        setPr({})
        setSu({})
        setLi({})
    };
    const handleClickEx = () => {
        setHo({})
        setWo({})
        setEx({ color: '#F5E663' })
        setPr({})
        setSu({})
        setLi({})
    };
    const handleClickPr = () => {
        setHo({})
        setWo({})
        setEx({})
        setPr({ color: '#F5E663' })
        setSu({})
        setLi({})
    };
    const handleClickSu = () => {
        setHo({})
        setWo({})
        setEx({})
        setPr({})
        setSu({ color: '#F5E663' })
        setLi({})
    };
    const handleClickLi = () => {
        setHo({})
        setWo({})
        setEx({})
        setPr({})
        setSu({})
        setLi({ color: '#F5E663' })
    };

    const checkUrl = () => {
        if (myUrl.includes('workout')) {
            handleClickWo()
        }
        else if (myUrl.includes('exercise')) {
            handleClickEx()
        }
        else if (myUrl.includes('profile')) {
            handleClickPr()
        }
        else if (myUrl.includes('signup')) {
            handleClickSu()
        }
        else if (myUrl.includes('login')) {
            handleClickLi()
        }
        else {
            handleClickHo()
        }
    }



    useEffect(() => {
        setMyUrl(location.pathname)
    }, [location])

    useEffect(() => {
        checkUrl()
    }, [myUrl])

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <div className="outterWord">
                    <NavLink exact to="/" className="wordsLink" style={ho} ><h3>Home</h3></NavLink>
                    <NavLink exact to="/workouts" className="wordsLink" style={wo} ><h3>My Workouts</h3></NavLink>
                    <NavLink exact to="/exercises" className="wordsLink" style={ex} ><h3>My Exercises</h3></NavLink>
                    <NavLink exact to="/profile" className="wordsLink" style={pr} ><h3>My Profile</h3></NavLink>
                </div>

                <div className="outterIcon">
                    <NavLink exact to="/" ><FontAwesomeIcon icon={faHouse} className='iconLink' style={ho} /></NavLink>
                    <NavLink exact to="/workouts"><FontAwesomeIcon icon={faDumbbell} className='iconLink' style={wo} /></NavLink>
                    <NavLink exact to="/exercises"><FontAwesomeIcon icon={faPencil} className='iconLink' style={ex} /></NavLink>
                    <NavLink exact to="/profile"><FontAwesomeIcon icon={faUserLarge} className='iconLink' style={pr} /></NavLink>
                </div>
            </>
        );
    } else {
        sessionLinks = (
            <div className="loggedOut">
                <NavLink exact to="/" className="wordsLink" style={ho} ><h3>Home</h3></NavLink>
                <NavLink to="/signup" style={su} onClick={handleClickSu}><h3>Sign Up</h3></NavLink>
                <NavLink to="/login" className="showLink" style={li} ><h3>Log In</h3></NavLink>
                <div className="showComp"><LoginFormNav /></div>
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
