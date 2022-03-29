import React from 'react';
import { NavLink } from 'react-router-dom';
import './LikeModal.css'

const LikeBrowser = ({ likes, users }) => {
    const likesIds = [];
    likes.forEach(like => {
        likesIds.push(like.user_id)
    })


    const usersList = Object.values(users)


    return (
        <div className='likesCont'>
            {likes && usersList?.map((user, i) => {
                if (likesIds.includes(user.id)) return (<NavLink to={`/user/${user.id}`}
                    className='likesUserLink'
                    key={user.id}
                    style={{ textDecoration: 'none' }}
                ><p
                    className='likesUserText'
                >@{user.username}</p></NavLink>)
            })}
        </div>
    )
}

export default LikeBrowser;
