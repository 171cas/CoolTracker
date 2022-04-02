import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';

import { createComment, deleteComment } from '../../store/comments';

import ExerciseBrowser from '../ExerciseBrowser';
import ExerciseCreate from '../ExerciseCreate';
import LikeModal from '../LikeModal'
import CommentModal from '../CommentModal'
import GoBack from '../GoBack';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons";

import { faHeart as fatHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";

const CommentDetail = ({ comment, sessionUser }) => {


    const [showMenu, setShowMenu] = useState(false);
    console.log(showMenu)

    const dispatch = useDispatch();


    const openMenu = () => {
        setShowMenu(!showMenu);
        console.log(showMenu)
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };
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
