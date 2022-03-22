import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getWorkouts } from '../../store/workouts';

import WorkoutDetail from '../WorkoutDetail';
import WorkoutCreate from '../WorkoutCreate';

import * as sessionActions from '../../store/session';
import './ProfilePage.css'

const ProfilePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/");
    };

    return (
        <div className='containerWO'>
            <div className='singleWO gridC'>
                <h3>{sessionUser?.username}</h3>
                <div className='divPic'><div className='profilePic'></div></div>
                <p>{sessionUser?.first_name} {sessionUser?.last_name}</p>
                <p>{sessionUser?.email}</p>
                <button className="addButton" onClick={logout}>Log Out</button>
            </div>
        </div>
    )
}

export default ProfilePage;
