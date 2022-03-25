import { useSelector } from 'react-redux';

import HomePage from "../HomePage";
import WorkoutPublic from "../WorkoutPublic";

const SplashPage = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <WorkoutPublic />
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
