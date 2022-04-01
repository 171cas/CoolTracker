import React from 'react';
import { NavLink } from 'react-router-dom';
import './CommentModal.css'

const CommentBrowser = ({ comments, users }) => {
    const commentsIds = [];
    comments.forEach(comment => {
        commentsIds.push(comment.user_id)
    })

    console.log(comments, 'asdasdasdas')

    const usersList = Object.values(users)


    return (
        <div className='commentsCont'>
            {comments && comments?.map((comment, i) => {
                return (
                    <div className='commentLine' key={comment?.id}>
                        <NavLink to={`/user/${comment?.User?.id}`}
                            className='userLink'

                            style={{ textDecoration: 'none' }}
                        >
                            <p
                                className='commentsUserText'
                            >
                                @{comment?.User?.username}:
                            </p>
                        </NavLink>
                        <p>
                            &nbsp;{comment?.content}.
                        </p>
                    </div>
                )
            })}

            <br />
        </div>
    )
}

export default CommentBrowser;
