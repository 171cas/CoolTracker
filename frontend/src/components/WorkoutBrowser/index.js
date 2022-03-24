import { useSelector } from 'react-redux';

import WorkoutDetail from '../WorkoutDetail';
import WorkoutCreate from '../WorkoutCreate';
import './WorkoutBrowser.css'

const WorkoutBrowser = () => {

    const sessionUser = useSelector(state => state.session.user);

    const workouts = useSelector((state) => state.workouts)
    const workoutList = Object.values(workouts).reverse().filter(({ user_id }) => user_id === +sessionUser.id)


    return (
        <div className='containerWO'>
            <WorkoutCreate />
            {workoutList && workoutList?.map((workout, i) => {
                return (<WorkoutDetail propId={workout.id} key={i} />)
            })}
        </div>
    )
}

export default WorkoutBrowser;
