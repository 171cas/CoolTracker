import React from 'react';
import { NavLink } from 'react-router-dom';
import './LikeModal.css'

const LikeBrowser = ({ likes }) => {

    return (
        <div className='likesCont'>
            {likes && likes?.map((like, i) => {
                return (<NavLink to={`/user/${like.User.id}`}
                    className='userLink'
                    key={like.id}
                    style={{ textDecoration: 'none' }}
                ><p
                    className='likesUserText'
                >@{like.User.username}</p></NavLink>)
            })}
        </div>
    )
}

export default LikeBrowser;
