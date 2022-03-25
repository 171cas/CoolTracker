import { useSelector } from 'react-redux';

import WorkoutDetail from '../WorkoutDetail';
import WorkoutCreate from '../WorkoutCreate';

import HowTo from '../HowTo';


const WorkoutPublic = () => {

    const sessionUser = useSelector(state => state.session.user);

    const workouts = useSelector((state) => state.workouts)
    const workoutList = Object.values(workouts).reverse()


    return (
        <>
            <HowTo /><br /><br />
            <h3 style={{ color: '#FF784F' }}>Public Workout Feed</h3><br /><br />
            <div className='containerWO'>
                {workoutList && workoutList?.map((workout, i) => {
                    return (<WorkoutDetail propId={workout.id} key={i} />)
                })}
            </div>
        </>
    )
}

export default WorkoutPublic;
