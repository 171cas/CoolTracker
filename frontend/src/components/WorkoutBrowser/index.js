import { useSelector } from 'react-redux';

import WorkoutDetail from '../WorkoutDetail';
import WorkoutCreate from '../WorkoutCreate';
import './WorkoutBrowser.css'

const WorkoutBrowser = () => {

    const workouts = useSelector((state) => state.workouts)
    const workoutList = Object.values(workouts).reverse()


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
