import React from 'react';
import { NavLink } from 'react-router-dom';

const FollowerBrowser = ({ followers }) => {

    return (
        <div className='likesCont'>
            {followers && followers?.map((follower, i) => {
                return (<NavLink to={`/user/${follower.User.id}`}
                    className='userLink'
                    key={follower.id}
                    style={{ textDecoration: 'none' }}
                ><p
                    className='likesUserText'
                >@{follower.User.username}</p></NavLink>)
            })}
        </div>
    )
}

export default FollowerBrowser;
