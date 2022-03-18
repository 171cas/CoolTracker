const ADD = '/likes/add'
const LOAD = '/likes/load'
const REMOVE = '/likes/remove'


const addLike = new_like => ({ type: ADD, new_like })
const loadLikes = likes => ({ type: LOAD, likes })
const removeLike = remove_like => ({ type: REMOVE, remove_like })


export const createLike = (payload) => async dispatch => {
    const response = await fetch('/api/likes/', {
        method: 'POST',
        body: payload,
    });
    if (response.ok) {
        const new_like = await response.json();
        dispatch(addLike(new_like));
        return new_like;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    }
    return response;
}

export const getLikes = () => async dispatch => {
    const response = await fetch('/api/likes/');
    if (response.ok) {
        const likes = await response.json();
        dispatch(loadLikes(likes));
        return likes;
    }
    return response;
}

export const deleteLike = (id) => async dispatch => {
    const response = await fetch(`/api/likes/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const remove_like = await response.json();
        dispatch(removeLike(id));
        return remove_like;
    }
    return response;
}



const likeReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD:
            newState = { ...state };
            newState[action.new_like.id] = action.new_like;
            return newState;
        case LOAD:
            newState = { ...state };
            action.likes.forEach(like => newState[like.id] = like);
            return newState;
        case REMOVE:
            newState = { ...state };
            delete newState[action.remove_like];
            return newState;
        default:
            return state;
    }
}

export default likeReducer;
