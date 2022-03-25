import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';

import { deleteWorkout } from '../../store/workouts';
import { deleteExercise } from '../../store/exercises';

import { createLike, deleteLike } from '../../store/likes';

import ExerciseBrowser from '../ExerciseBrowser';
import ExerciseCreate from '../ExerciseCreate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons";

import { faHeart as fatHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import './WorkoutDetail.css'

const WorkoutDetail = ({ propId }) => {
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
    const likesCount = likesWO.length

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
                    {workout?.date ? (<p>Date: {workout?.date}</p>) : (<></>)}
                    {workout?.notes ? (<p>Notes: {workout?.notes}</p>) : (<></>)}
                    {workout?.completion_time ? (<p>Completion Time: {workout?.completion_time}</p>) : (<></>)}
                    {workout?.calories_burned ? (<p>Calories Burned: {workout?.calories_burned}</p>) : (<></>)}
                    {workout?.body_weight ? (<p>Body Weight: {workout?.body_weight}</p>) : (<></>)}
                    {(isUser && !propId) && <ExerciseCreate propId={workout?.id} />}
                    {propId ? <NavLink to={`/workout/${workout?.id}`}><h4>Exercises: {exCount}</h4></NavLink>
                        : <ExerciseBrowser propId={workout?.id} />}
                </div>
                <div className='interactions'>
                    <div>
                        {likesCount}&nbsp;
                        <FontAwesomeIcon icon={(isLiked ? fatHeart : faHeart)} onClick={handleLike} className='' />
                    </div>
                    <FontAwesomeIcon icon={faComment} className='' />
                </div>
            </div>
        </div>
    )
}

export default WorkoutDetail;
