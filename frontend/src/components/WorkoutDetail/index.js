import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../store/workouts';
import { getExercises } from '../../store/exercises';
import ExerciseBrowser from '../ExerciseBrowser';
import ExerciseCreate from '../ExerciseCreate';
import './WorkoutDetail.css'

const WorkoutDetail = ({ propId }) => {
    let { workoutId } = useParams();
    if (propId) workoutId = propId;

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const workouts = useSelector((state) => state.workouts)
    const workout = workouts[workoutId]

    const exercises = useSelector((state) => state.exercises)
    const exList = Object.values(exercises)
    const exercisesWO = exList.filter(({ workout_id }) => workout_id === +workoutId)
    const exCount = exercisesWO.length

    const handleClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteWorkout(+workoutId))
        await dispatch(getExercises())
        if (!propId) history.push(`/workouts`)
    };

    let reviewLinks;
    if (sessionUser?.id === workout?.user_id) {
        reviewLinks = (
            <>
                <button onClick={handleClickDelete}>Delete Workout</button>
                <NavLink to={`/workout/${workout?.id}/edit`}><button>Edit Workout</button></NavLink>
            </>
        );
    } else {
        reviewLinks = (
            <>
            </>
        );
    }


    return (
        <div className='singleWO'>
            <p>
                <NavLink to={`/workout/${workout?.id}`} >Workout #{workout?.id} </NavLink>
                {reviewLinks && reviewLinks}
            </p>
            {workout?.date ? (<p>Date #{workout?.date}</p>) : (<></>)}
            {workout?.notes ? (<p>Notes: {workout?.notes}</p>) : (<></>)}
            {workout?.completion_time ? (<p>Completion Time: {workout?.completion_time}</p>) : (<></>)}
            {workout?.calories_burned ? (<p>Calories Burned: {workout?.calories_burned}</p>) : (<></>)}
            {workout?.body_weight ? (<p>Body Weight: {workout?.body_weight}</p>) : (<></>)}
            {!propId && <ExerciseCreate propId={workout?.id} />}
            {propId ? <p><NavLink to={`/workout/${workout?.id}`} >Exercises: {exCount} </NavLink></p>
                : <ExerciseBrowser propId={workout?.id} />}
        </div>
    )
}

export default WorkoutDetail;
