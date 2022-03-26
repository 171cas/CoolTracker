import { useSelector } from 'react-redux';
import WorkoutDetail from '../WorkoutDetail';
import HowTo from '../HowTo';

const WorkoutPublic = ({ propId }) => {
    const profUserId = propId;

    const workouts = useSelector((state) => state.workouts)
    let woFeed;
    if (profUserId) {
        woFeed = Object.values(workouts).filter((workout) => workout.user_id === +profUserId).reverse()
    } else {
        woFeed = Object.values(workouts).reverse()
    }


    return (
        <>
            {!profUserId && <>
                <HowTo /><br /><br />
                <h3 style={{ color: '#FF784F' }}>Public Workout Feed</h3><br /><br />
            </>}
            <div className='containerWO'>
                {woFeed && woFeed?.map((workout, i) => {
                    return (<WorkoutDetail propId={workout.id} key={i} />)
                })}
            </div>
        </>
    )
}

export default WorkoutPublic;
