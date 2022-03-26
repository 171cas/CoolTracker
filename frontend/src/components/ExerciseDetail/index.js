import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { deleteExercise } from '../../store/exercises';


import './ExerciseDetail.css'

const ExerciseDetail = ({ propId }) => {
    let { exerciseId } = useParams();
    if (propId) exerciseId = propId;

    const [showMenu, setShowMenu] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const exercises = useSelector((state) => state.exercises)
    const exercise = exercises[exerciseId]



    const handleClickDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteExercise(+exerciseId))
        if (!propId) history.push(`/exercises`)
    };

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
    let reviewLinks;
    if (sessionUser?.id === exercise?.user_id) {
        reviewLinks = (
            <>
                <FontAwesomeIcon icon={faGear} onClick={openMenu} className='gear' />
                {showMenu && (
                    <>
                        <button onClick={handleClickDelete} className='greyButton'>Delete Exercise</button>
                        <NavLink to={`/exercise/${exercise?.id}/edit`} ><button className='greyButton'>Edit Exercise</button></NavLink>
                    </>
                )}
            </>
        );
    }


    return (
        <>
            <div className='singleEx'>
                <h3><NavLink to={`/exercise/${exercise?.id}`} >Exercise #{exercise?.id} </NavLink>
                    {reviewLinks && reviewLinks}
                </h3>
                {(!propId) ? (<NavLink to={`/workout/${exercise?.workout_id}`} ><p>Workout: {exercise?.workout_id}</p></NavLink>) : (<></>)}
                {exercise?.name ? (<p>Name: {exercise?.name}</p>) : (<></>)}
                {exercise?.notes ? (<p>Notes: {exercise?.notes}</p>) : (<></>)}
                {exercise?.distance ? (<p>Distance: {exercise?.distance}</p>) : (<></>)}
                {exercise?.sets ? (<p>Sets: {exercise?.sets}</p>) : (<></>)}
                {exercise?.reps ? (<p>Reps: {exercise?.reps}</p>) : (<></>)}
                {exercise?.rest ? (<p>Rest: {exercise?.rest}</p>) : (<></>)}
                {exercise?.weight ? (<p>Weight: {exercise?.weight}</p>) : (<></>)}
            </div>
        </>
    )
}

export default ExerciseDetail;
