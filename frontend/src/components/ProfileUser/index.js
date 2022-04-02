import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


import { createFollow, deleteFollower } from '../../store/followers';

import WorkoutPublic from "../WorkoutPublic";

import GoBack from "../GoBack";

import './ProfileUser.css'

const ProfileUser = () => {

    const { profUserId } = useParams();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const users = useSelector((state) => state.users)
    const userArr = Object.values(users)
    const profUser = userArr.find(user => user.id === +profUserId)

    const followers = useSelector((state) => state.followers)
    const followersList = Object.values(followers)
    const myFolloweds = followersList.filter(({ follower_id }) => follower_id === sessionUser.id)

    const isFollowed = myFolloweds.find(followed => followed.followed_id === +profUserId)

    console.log(isFollowed)

    const [showMenu, setShowMenu] = useState(false);
    const [title, setTitle] = useState(`Get User's Workouts`);

    const changemenu = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        if (!showMenu) {
            setTitle(`Get User's Workouts`)
            return;
        }
        if (showMenu) {
            setTitle('Close Workouts Feed')
            return;
        }
    }, [showMenu]);

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
                        <div className='divPic'><div className='profilePic'></div></div>
                        <p>{profUser?.first_name} {profUser?.last_name}</p>
                    </div>
                    <div className='follDm'>
                        <button onClick={handleFollow} className='addButton'>{isFollowed ? 'Unfollow' : 'Follow'} {profUser?.username}</button>
                        <button className='addButton'>Coming Soon: Message {profUser?.username}</button>
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
