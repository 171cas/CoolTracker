
import { useParams, NavLink, useHistory } from 'react-router-dom';

const UserBrowser = ({ users }) => {

    return (
        <>
            {users?.length > 0 && users?.map((user, i) => {
                return (<h3 style={{ marginTop: '10px' }}>
                    <NavLink to={`/user/${user?.id}`} >@{user?.username} </NavLink>
                </h3>)
            })}
        </>
    )
}

export default UserBrowser;
