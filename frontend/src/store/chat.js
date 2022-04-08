import { csrfFetch } from './csrf';

const ADD = '/chat/add'
const LOAD = '/chat/load'


const addChat = new_chat => ({ type: ADD, new_chat })
const loadChat = chats => ({ type: LOAD, chats })


export const createChat = (payload) => async dispatch => {

    const response = await csrfFetch('/api/chat/', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const new_chat = await response.json();
        dispatch(addChat(new_chat));
        return new_chat;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    }
    return response;
}

export const getChats = () => async dispatch => {
    const response = await fetch('/api/chat/');
    if (response.ok) {
        const chats = await response.json();
        dispatch(loadChat(chats));
        return chats;
    }
    return response;
}


const chatReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD:
            newState = { ...state };
            newState[action.new_chat.id] = action.new_chat;
            return newState;
        case LOAD:
            newState = { ...state };
            action.chats.forEach(chat => newState[chat.id] = chat);
            return newState;
        default:
            return state;
    }
}

export default chatReducer;
