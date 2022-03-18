import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getWorkouts } from '../../store/workouts';

import WorkoutDetail from '../WorkoutDetail';
import WorkoutCreate from '../WorkoutCreate';

const WorkoutBrowser = () => {

    const workouts = useSelector((state) => state.workouts)
    const workoutList = Object.values(workouts).reverse()



    return (
        <>
            <WorkoutCreate />
            <div className='containerWO'>
                {workoutList && workoutList?.map((workout, i) => {
                    //console.log(workout)
                    return (<WorkoutDetail propId={workout.id} key={i} />) // change it later to workout.id
                })}
            </div>
        </>
    )
}

export default WorkoutBrowser;
