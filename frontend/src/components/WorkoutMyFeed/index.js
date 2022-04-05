import { useSelector } from 'react-redux';
import WorkoutDetail from '../WorkoutDetail';

const WorkoutMyFeed = ({ sessionUser }) => {

    const followers = useSelector((state) => state.followers)
    const followersList = Object.values(followers)

    const myFolloweds = followersList.filter(({ follower_id }) => follower_id === sessionUser.id)
    const feedIds = myFolloweds.map(followed => followed.followed_id)
    feedIds.push(sessionUser.id)

    const workouts = Object.values(useSelector((state) => state.workouts))
    const myWOFeed = workouts.filter(workout => feedIds.includes(workout.user_id)).sort(function (a, b) {
        if (a.date < b.date) {
            return 1;
        }
        if (a.date > b.date) {
            return -1;
        }

        // names must be equal
        return 0;
    });
    console.log(myWOFeed)
    //let woFeed = Object.values(workouts).filter((workout) => workout.user_id === +profUserId).reverse()

    const users = useSelector((state) => state.users)
    const usersList = Object.values(users)


    return (
        <>
            <div className='containerWO'>
                {myWOFeed.length > 0 ? (myWOFeed?.map((workout, i) => {
                    if (feedIds.includes(workout.user_id)) {
                        return (<WorkoutDetail propId={workout.id} user={workout.User} key={i} />)
                    }
                })) : <h3 style={{ color: '#FF784F' }}>Nothing in your feed.<br /> Create a Workout or follow other Users </h3>}
            </div>
        </>
    )
}

export default WorkoutMyFeed;
