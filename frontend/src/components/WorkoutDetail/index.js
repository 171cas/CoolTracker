import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getWorkouts, deleteWorkout } from '../../store/workouts';
import { getExercises } from '../../store/exercises';
import ExerciseBrowser from '../ExerciseBrowser';
import ExerciseCreate from '../ExerciseCreate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons";
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
                <FontAwesomeIcon icon={faGear} onClick={openMenu} className='gear' />
                {showMenu && (
                    <>
                        <button onClick={handleClickDelete} className='optionButton'>Delete Workout</button>
                        <NavLink to={`/workout/${workout?.id}/edit`} ><button className='optionButton'>Edit Workout</button></NavLink>
                    </>
                )}
            </>
        );
    } else {
        reviewLinks = (
            <>
            </>
        );
    }


    return (
        <div className='containerWO'>
            <div className='singleWO'>
                <div>
                    <NavLink to={`/workout/${workout?.id}`} ><h3>Workout #{workout?.id}</h3></NavLink>
                    {reviewLinks && reviewLinks}
                </div>
                {workout?.date ? (<p>Date #{workout?.date}</p>) : (<></>)}
                {workout?.notes ? (<p>Notes: {workout?.notes}</p>) : (<></>)}
                {workout?.completion_time ? (<p>Completion Time: {workout?.completion_time}</p>) : (<></>)}
                {workout?.calories_burned ? (<p>Calories Burned: {workout?.calories_burned}</p>) : (<></>)}
                {workout?.body_weight ? (<p>Body Weight: {workout?.body_weight}</p>) : (<></>)}
                {!propId && <ExerciseCreate propId={workout?.id} />}
                {propId ? <NavLink to={`/workout/${workout?.id}`}><h4>Exercises: {exCount}</h4></NavLink>
                    : <ExerciseBrowser propId={workout?.id} />}
            </div>
        </div>
    )
}

export default WorkoutDetail;
