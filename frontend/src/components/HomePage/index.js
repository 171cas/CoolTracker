import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (!sessionUser) {
        sessionLinks = (
            <>
                <h2>What can you do?</h2>
                <h2>Create a Workout!</h2>
                <h2>Add exercises to a Workout!</h2>
                <h2>Like Workouts!</h2>
            </>
        );
    } else {
        return <Redirect to='/workouts' />
    }

    return (
        <nav>
            {sessionLinks && sessionLinks}
        </nav>
    );

}

export default HomePage;
