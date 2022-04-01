const ADD = 'users/ADD'
const LOAD = 'users/LOAD'

const addUsers = (users) => ({
    type: ADD,
    users
});
const loadUsers = (users) => ({
    type: LOAD,
    users
});

export const getUsers = () => async dispatch => {
    const response = await fetch('/api/users/');
    if (response.ok) {
        const users = await response.json();
        dispatch(loadUsers(users));
        return users
    }
    return response
}


const usersReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD: {
            newState = { ...state };
            action.users.forEach(user => newState[user.id] = user);
            return newState
        }
        default:
            return state
    }
}

export default usersReducer;
