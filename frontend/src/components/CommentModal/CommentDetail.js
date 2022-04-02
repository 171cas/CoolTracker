import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { deleteComment } from '../../store/comments';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons";

const CommentDetail = ({ comment, sessionUser }) => {


    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();


    const openMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;
    }, [showMenu]);


    const handleClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteComment(comment.id))
    };


    let reviewLinks;
    const isUser = sessionUser?.id === comment?.user_id || sessionUser?.id === comment?.Workout.user_id
    if (isUser) {
        reviewLinks = (
            <>
                <FontAwesomeIcon icon={faGear} onClick={openMenu} className='gear' />
                {showMenu && (
                    <>
                        <button onClick={handleClickDelete} className='greyButton'>Delete</button>
                    </>
                )}
            </>
        );
    }

    return (
        <>
            <div className='commentLine' key={comment?.id}>
                {reviewLinks && reviewLinks}
                <NavLink to={`/user/${comment?.User?.id}`}
                    className='userLink'

                    style={{ textDecoration: 'none' }}
                >
                    <p
                        className='commentsUserText'
                    >
                        @{comment?.User?.username}
                    </p>
                </NavLink>
                <p>
                    :&nbsp;"{comment?.content}"
                </p>
            </div>
        </>
    )
}

export default CommentDetail;
