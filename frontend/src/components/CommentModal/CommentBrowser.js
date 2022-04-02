import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CommentDetail from './CommentDetail';
import './CommentModal.css'

const CommentBrowser = ({ comments }) => {

    const sessionUser = useSelector(state => state.session.user);


    return (
        <div className='commentsCont'>
            {comments && comments?.map((comment, i) => {
                return (
                    <CommentDetail sessionUser={sessionUser} comment={comment} key={comment.id} />
                )
            })}

            <br />
        </div>
    )
}

export default CommentBrowser;
