import { useSelector } from 'react-redux';

import ExerciseDetail from '../ExerciseDetail';

const ExerciseBrowser = ({ propId }) => {

    const sessionUser = useSelector(state => state.session.user);

    const exercises = useSelector((state) => state.exercises)
    const exerciseList = (propId ?
        Object.values(exercises)
            .filter((exercise) => exercise.workout_id === +propId)
            .reverse()
        :
        Object.values(exercises).reverse().filter(({ user_id }) => user_id === +sessionUser.id)
    )

    return (
        <div className='containerEx'>
            {exerciseList && exerciseList?.map((exercise, i) => {
                return (<ExerciseDetail propId={exercise.id} key={i} />) // change it later
            })}
            {exerciseList.length == 0 && <p>No Exercises yet!</p>}
        </div>
    )
}

export default ExerciseBrowser;
