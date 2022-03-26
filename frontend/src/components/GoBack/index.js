import { useHistory } from 'react-router-dom';
import './GoBack.css'

const GoBack = () => {

    const history = useHistory();

    const handleClickGoBack = async (e) => {
        e.preventDefault();
        history.goBack()
    };


    return (
        <button onClick={handleClickGoBack} className='GoBack'>Go Back</button>
    )
}

export default GoBack;
