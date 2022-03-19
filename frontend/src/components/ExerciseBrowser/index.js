import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';

import ExerciseDetail from '../ExerciseDetail';

const ExerciseBrowser = ({ propId }) => {

    const exercises = useSelector((state) => state.exercises)
    const exerciseList = (propId ?
        Object.values(exercises)
            .filter((exercise) => exercise.workout_id === +propId)
            .reverse()
        :
        Object.values(exercises).reverse()
    )

    return (
        <>

            <div className='containerEx'>
                {exerciseList && exerciseList?.map((exercise, i) => {
                    return (<ExerciseDetail propId={exercise.id} key={i} />) // change it later
                })}
            </div>
        </>
    )
}

export default ExerciseBrowser;