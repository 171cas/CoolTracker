import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import * as sessionActions from '../../store/session';

import { createFollow, deleteFollower } from '../../store/followers';

import WorkoutPublic from "../WorkoutPublic";
import FollowerModal from "../FollowerModal";
import FollowedModal from "../FollowedModal";
import MessageModal from "../MessageModal";


import GoBack from "../GoBack";

import './ProfileUser.css'

const ProfileUser = () => {

    const history = useHistory();

    const { profUserId } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const users = useSelector((state) => state.users)
    const userArr = Object.values(users)
    const profUser = userArr.find(user => user.id === +profUserId)

    const isSameUser = profUser?.id === sessionUser?.id

    const followers = useSelector((state) => state.followers)
    const followersList = Object.values(followers)

    const userFollowers = followersList.filter(({ followed_id }) => followed_id === +profUserId)
    const userFollowing = followersList.filter(({ follower_id }) => follower_id === +profUserId)






    const myFolloweds = followersList.filter(({ follower_id }) => follower_id === sessionUser.id)

    const isFollowed = myFolloweds.find(followed => followed.followed_id === +profUserId)

    const [showMenu, setShowMenu] = useState(false);
    const [title, setTitle] = useState('');

    const changemenu = () => {
        setShowMenu(!showMenu);
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        //history.push("/");
    };



    useEffect(() => {
        if (!showMenu) {
            setTitle(`Get ${profUser?.username}'s Workouts`)
            return;
        }
        if (showMenu) {
            setTitle('Close Workouts Feed')
            return;
        }
    }, [showMenu, profUser]);

    const handleFollow = async (e) => {
        if (isFollowed) {
            await dispatch(deleteFollower(isFollowed.id))
        } else {
            await dispatch(createFollow({ followed_id: +profUserId }))
        }
    };


    return (
        <>
            <div className='containerWO'>
                <div className='singleWO'>
                    <h3>{profUser?.username}</h3>
                    <div className='gridC'>
                        <div className='divPic'><img className='profilePic' src={`${profUser?.prof_pic}`} alt="Profile Pic" /></div>
                        <p>{profUser?.first_name} {profUser?.last_name}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <FollowerModal followers={userFollowers} modalVal={false} /> <FollowedModal following={userFollowing} userArr={userArr} />
                        </div>
                    </div>
                    <div className='follDm'>

                        {isSameUser ?
                            <div>
                                <button className="addButton" onClick={logout}>Log Out</button>
                                <button className="addButton">My Messages</button>
                            </div>

                            : (
                                <>
                                    <button onClick={handleFollow} className='addButton'>{isFollowed ? 'Unfollow' : 'Follow'}</button>
                                    <MessageModal sessionUser={sessionUser} profUserId={profUserId} />
                                </>
                            )}
                    </div>
                </div>
                <GoBack />
                <button onClick={changemenu} className='addButton'>{title}</button><br />
            </div>
            {showMenu && (
                <WorkoutPublic propId={profUserId} />
            )}
        </>
    )
}

export default ProfileUser;
