import React from 'react';
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
                if (likesIds.includes(user.id)) return (<p key={user.id}>{user.username}</p>)
            })}
        </div>
    )
}

export default LikeBrowser;
