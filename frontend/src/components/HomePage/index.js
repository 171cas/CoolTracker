import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import HowTo from "./HowTo"
import './HomePage.css'

const HomePage = () => {
    const resumeLink = async (e) => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/cesar-solano-320211230/');
    };
    const gitLink = async (e) => {
        e.preventDefault();
        window.open('https://github.com/171cas/');
    };
    const linkeLink = async (e) => {
        e.preventDefault();
        window.open('https://www.linkedin.com/in/cesar-solano-320211230/');
    };

    return (
        <div className='containerHome'>
            <h2>What can you do?</h2>
            <h2>Create a Workout!</h2>
            <h2>Add exercises to a Workout!</h2>
            <h2>Like Workouts!</h2>
            <HowTo />
            <br /><br /><br />
            <h2>Develop By:</h2>
            <h3 className='myName' onClick={resumeLink}>Cesar Solano</h3>
            <div>
                <FontAwesomeIcon icon={faGithub} className='gitClass' onClick={gitLink} />
                <FontAwesomeIcon icon={faLinkedin} className='linkClass' onClick={linkeLink} />
            </div>
        </div>
    );

}

export default HomePage;
