import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import './ProfilePage.css'

const ProfilePage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/");
    };

    return (
        <div className='containerWO'>
            <div className='singleWO'>
                <h3>{sessionUser?.username}</h3>
                <div className='gridC'>
                    <div className='divPic'><div className='profilePic'></div></div>
                    <p>{sessionUser?.first_name} {sessionUser?.last_name}</p>
                    <p>{sessionUser?.email}</p>
                    <button className="addButton" onClick={logout}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
