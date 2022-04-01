import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';

import { deleteWorkout } from '../../store/workouts';
import { deleteExercise } from '../../store/exercises';

import { createLike, deleteLike } from '../../store/likes';
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
import './WorkoutDetail.css'

const WorkoutDetail = ({ propId, user }) => {
    let { workoutId } = useParams();
    if (propId) workoutId = propId;


    const [showMenu, setShowMenu] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const workouts = useSelector((state) => state.workouts)
    const workout = workouts[workoutId]

    const exercises = useSelector((state) => state.exercises)
    const exList = Object.values(exercises)
    const exercisesWO = exList.filter(({ workout_id }) => workout_id === +workoutId)
    const exCount = exercisesWO.length

    const likes = useSelector((state) => state.likes)
    const likesList = Object.values(likes)
    const likesWO = likesList.filter(({ workout_id }) => workout_id === +workoutId)

    const comments = useSelector((state) => state.comments)
    const commentsList = Object.values(comments)
    const commentsWO = commentsList.filter(({ workout_id }) => workout_id === +workoutId)


    const isLiked = likesWO.find(likes => likes.user_id === sessionUser.id)



    const openMenu = () => {
        setShowMenu(true);
    };
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const deleteExeCascade = async () => {
        await exercisesWO.forEach(exercise => {
            dispatch(deleteExercise(exercise?.id))
        })
    }

    const handleClickDelete = async (e) => {
        e.preventDefault();
        await deleteExeCascade()
        await dispatch(deleteWorkout(+workoutId))
        if (!propId) history.push(`/workouts`)
    };

    const handleLike = async (e) => {
        if (isLiked) {
            await dispatch(deleteLike(isLiked.id))
        } else {
            await dispatch(createLike({ workout_id: workoutId }))
        }
    };


    let reviewLinks;
    const isUser = sessionUser?.id === workout?.user_id
    if (isUser) {
        reviewLinks = (
            <>
                <FontAwesomeIcon icon={faGear} onClick={openMenu} className='gear' />
                {showMenu && (
                    <>
                        <button onClick={handleClickDelete} className='greyButton'>Delete Workout</button>
                        <NavLink to={`/workout/${workout?.id}/edit`} ><button className='greyButton'>Edit Workout</button></NavLink>
                    </>
                )}
            </>
        );
    }

    return (
        <div className='containerWO'>
            <div className='singleWO'>
                <h3><NavLink to={`/workout/${workout?.id}`} >Workout #{workout?.id}</NavLink>
                    {reviewLinks && reviewLinks}
                </h3>
                <div className='details'>
                    {user ? (<p><NavLink to={`/user/${user.id}`} style={{ fontFamily: 'Fjalla One' }}>By {user.username}:</NavLink></p>) : (<></>)}
                    {workout?.date ? (<p>Date: {workout?.date}</p>) : (<></>)}
                    {isUser && !workout.notes && !workout.completion_time &&
                        <NavLink to={`/workout/${workout?.id}/edit`} style={{ color: 'white' }}> <p>Hey! Do you want to add more details to this workout? &#9997; &nbsp; &#128170; </p></NavLink>}
                    {workout?.notes ? (<p>Notes: {workout?.notes}</p>) : (<></>)}
                    {workout?.completion_time ? (<p>Completion Time: {workout?.completion_time}</p>) : (<></>)}
                    {workout?.calories_burned ? (<p>Calories Burned: {workout?.calories_burned}</p>) : (<></>)}
                    {workout?.body_weight ? (<p>Body Weight: {workout?.body_weight}</p>) : (<></>)}
                    {(isUser && !propId) && <ExerciseCreate propId={workout?.id} />}
                    {propId ? <h4><NavLink to={`/workout/${workout?.id}`} style={{ fontFamily: 'Fjalla One' }}>Exercises: {exCount}</NavLink></h4>
                        : <ExerciseBrowser propId={workout?.id} />}
                </div>
                <div className='interactions'>
                    <div style={{ display: 'flex' }}>
                        <LikeModal likes={likesWO} users={useSelector((state) => state.users)} />&nbsp;
                        <FontAwesomeIcon icon={(isLiked ? fatHeart : faHeart)} onClick={handleLike} className='' style={{ cursor: 'pointer' }} />
                    </div>

                    <div style={{ display: 'flex' }}>
                        <CommentModal comments={commentsWO} users={useSelector((state) => state.users)} />&nbsp;
                        <FontAwesomeIcon icon={faComment} className='' />
                    </div>
                </div>
            </div>
            {!propId && <GoBack />}
        </div>
    )
}

export default WorkoutDetail;
