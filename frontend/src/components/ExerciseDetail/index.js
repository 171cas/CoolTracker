import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getExercises, deleteExercise } from '../../store/exercises';

const ExerciseDetail = ({ propId }) => {
    let { exerciseId } = useParams();
    if (propId) exerciseId = propId;

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const exercises = useSelector((state) => state.exercises)
    const exercise = exercises[exerciseId]


    const handleClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteExercise(+exerciseId))
        history.push(`/`)
    };

    let reviewLinks;
    if (sessionUser?.id === exercise?.user_id) {
        reviewLinks = (
            <>
                <button onClick={handleClickDelete}>Delete Exercise</button>
                <NavLink to={`/exercise/${exercise?.id}/edit`}><button>Edit Exercise</button></NavLink>
            </>
        );
    } else {
        reviewLinks = (
            <>
            </>
        );
    }


    return (
        <div className='singleEx'>
            <p><NavLink to={`/exercise/${exercise?.id}`} >Exercise #{exercise?.id} </NavLink> </p>
            {reviewLinks && reviewLinks}
            {exercise?.name ? (<p>Name #{exercise?.name}</p>) : (<></>)}
            {exercise?.notes ? (<p>Notes #{exercise?.notes}</p>) : (<></>)}
            {exercise?.distance ? (<p>Distance: {exercise?.distance}</p>) : (<></>)}
            {exercise?.sets ? (<p>Sets: {exercise?.sets}</p>) : (<></>)}
            {exercise?.reps ? (<p>Reps: {exercise?.reps}</p>) : (<></>)}
            {exercise?.rest ? (<p>Rest: {exercise?.rest}</p>) : (<></>)}
            {exercise?.weight ? (<p>Weight: {exercise?.weight}</p>) : (<></>)}
        </div>
    )
}

export default ExerciseDetail;
