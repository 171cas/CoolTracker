import { useSelector } from 'react-redux';

import HomePage from "../HomePage";
import WorkoutMyFeed from '../WorkoutMyFeed';

const SplashPage = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <WorkoutMyFeed sessionUser={sessionUser} />
        );
    } else {
        sessionLinks = (
            <HomePage />
        );
    }

    return (
        <>
            {isLoaded && sessionLinks}
        </>
    );

}

export default SplashPage;
