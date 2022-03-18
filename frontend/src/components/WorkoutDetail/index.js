import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../store/workouts';

const WorkoutDetail = ({ propId }) => {
    let { workoutId } = useParams();
    if (propId) workoutId = propId;

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const workouts = useSelector((state) => state.workouts)
    const workout = workouts[workoutId]


    //console.log('workoutId', workoutId)

    const exercises = useSelector((state) => state.exercises)
    const exList = Object.values(exercises)
    const exercisesWO = exList.filter(({ workout_id }) => workout_id === +workoutId)


    // console.log('exercises', exercises)
    // console.log('exList', exList)
    // console.log('exercisesWO', exercisesWO)

    const handleClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteWorkout(+workoutId))
        history.push(`/`)
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
            <p><NavLink to={`/workout/${workout?.id}`} >Workout #{workout?.id} </NavLink> </p>
            {reviewLinks && reviewLinks}
            {workout?.date ? (<p>Date #{workout?.date}</p>) : (<></>)}
            {workout?.notes ? (<p>Notes: {workout?.notes}</p>) : (<></>)}
            {workout?.completion_time ? (<p>Completion Time: {workout?.completion_time}</p>) : (<></>)}
            {workout?.calories_burned ? (<p>Calories Burned: {workout?.calories_burned}</p>) : (<></>)}
            {workout?.body_weight ? (<p>Body Weight: {workout?.body_weight}</p>) : (<></>)}
        </div>
    )
}

export default WorkoutDetail;
