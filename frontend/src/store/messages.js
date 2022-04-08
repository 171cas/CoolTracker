import { csrfFetch } from './csrf';

const ADD = '/messages/add'
const LOAD = '/messages/load'


const addMessage = new_message => ({ type: ADD, new_message })
const loadMessage = messages => ({ type: LOAD, messages })


export const createMessage = (payload) => async dispatch => {

    const response = await csrfFetch('/api/messages/', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const new_message = await response.json();
        dispatch(addMessage(new_message));
        return new_message;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    }
    return response;
}

export const getMessages = () => async dispatch => {
    const response = await fetch('/api/messages/');
    if (response.ok) {
        const messages = await response.json();
        dispatch(loadMessage(messages));
        return messages;
    }
    return response;
}


const messageReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD:
            newState = { ...state };
            newState[action.new_message.id] = action.new_message;
            return newState;
        case LOAD:
            newState = { ...state };
            action.messages.forEach(message => newState[message.id] = message);
            return newState;
        default:
            return state;
    }
}

export default messageReducer;
