import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../store/workouts';

const WorkoutDetail = ({ propId }) => {
    let { workoutId } = useParams();
    if (propId) workoutId = propId;

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
    };

    let reviewLinks;
    if (sessionUser?.id === workout?.user_id) {
        reviewLinks = (
            <>
                <button onClick={handleClickDelete}>Delete Workout</button>
                <button>Edit Workout</button>
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
            <p>Date #{workout?.date}</p>
            <p>Note #{workout?.notes}</p>
        </div>
    )
}

export default WorkoutDetail;
