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

    const users = useSelector((state) => state.users)
    const usersList = Object.values(users)


    return (
        <>
            {!profUserId && <>
                <HowTo /><br /><br />
                <h3 style={{ color: '#FF784F' }}>Public Workout Feed</h3><br /><br />
            </>}
            <div className='containerWO'>
                {woFeed && woFeed?.map((workout, i) => {
                    const userArrWO = usersList.filter(({ id }) => id === +workout.user_id)
                    const userWO = userArrWO[0]
                    return (<WorkoutDetail propId={workout.id} user={userWO} key={i} />)
                })}
            </div>
        </>
    )
}

export default WorkoutPublic;
