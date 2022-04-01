import { csrfFetch } from './csrf';

const ADD = '/comments/add'
const LOAD = '/comments/load'
const REMOVE = '/comments/remove'


const addComment = new_comment => ({ type: ADD, new_comment })
const loadComment = comments => ({ type: LOAD, comments })
const removeComment = remove_comment => ({ type: REMOVE, remove_comment })


export const createComment = (payload) => async dispatch => {

    const response = await csrfFetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const new_comment = await response.json();
        dispatch(addComment(new_comment));
        return new_comment;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    }
    return response;
}

export const getComments = () => async dispatch => {
    const response = await fetch('/api/comments/');
    if (response.ok) {
        const comments = await response.json();
        dispatch(loadComment(comments));
        return comments;
    }
    return response;
}

export const deleteComment = (id) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const remove_comment = await response.json();
        dispatch(removeComment(id));
        return remove_comment;
    }
    return response;
}



const commentReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD:
            newState = { ...state };
            newState[action.new_comment.id] = action.new_comment;
            return newState;
        case LOAD:
            newState = { ...state };
            action.comments.forEach(comment => newState[comment.id] = comment);
            return newState;
        case REMOVE:
            newState = { ...state };
            delete newState[action.remove_comment];
            return newState;
        default:
            return state;
    }
}

export default commentReducer;
