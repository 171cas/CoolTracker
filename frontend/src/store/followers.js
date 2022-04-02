import { csrfFetch } from './csrf';

const ADD = '/followers/add'
const LOAD = '/followers/load'
const REMOVE = '/followers/remove'


const addFollower = new_follower => ({ type: ADD, new_follower })
const loadFollowers = followers => ({ type: LOAD, followers })
const removeFollower = remove_follower => ({ type: REMOVE, remove_follower })


export const createFollow = (payload) => async dispatch => {

    const response = await csrfFetch('/api/followers/', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const new_follower = await response.json();
        dispatch(addFollower(new_follower));
        return new_follower;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    }
    return response;
}

export const getFollowers = () => async dispatch => {
    const response = await fetch('/api/followers/');
    if (response.ok) {
        const followers = await response.json();
        dispatch(loadFollowers(followers));
        return followers;
    }
    return response;
}

export const deleteFollower = (id) => async dispatch => {
    const response = await csrfFetch(`/api/followers/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const remove_follower = await response.json();
        dispatch(removeFollower(id));
        return remove_follower;
    }
    return response;
}



const followerReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD:
            newState = { ...state };
            newState[action.new_follower.id] = action.new_follower;
            return newState;
        case LOAD:
            newState = { ...state };
            action.followers.forEach(follower => newState[follower.id] = follower);
            return newState;
        case REMOVE:
            newState = { ...state };
            delete newState[action.removeFollower];
            return newState;
        default:
            return state;
    }
}

export default followerReducer;
