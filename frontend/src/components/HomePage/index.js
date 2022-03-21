import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    let sessionLinks;

    return (
        <div className='containerHome'>
            <h2>What can you do?</h2>
            <h2>Create a Workout!</h2>
            <h2>Add exercises to a Workout!</h2>
            <h2>Like Workouts!</h2>
        </div>
    );

}

export default HomePage;
