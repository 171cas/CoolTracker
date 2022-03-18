const ADD = '/exercises/add'
const LOAD = '/exercises/load'
const UPDATE = '/exercises/edit'
const REMOVE = '/exercises/remove'


const addExercise = new_exercise => ({ type: ADD, new_exercise })
const loadExercises = exercises => ({ type: LOAD, exercises })
const updateExercise = edit_exercise => ({ type: UPDATE, edit_exercise })
const removeExercise = remove_exercise => ({ type: REMOVE, remove_exercise })


export const createExercise = (payload) => async dispatch => {
    const response = await fetch('/api/exercises/', {
        method: 'POST',
        body: payload,
    });
    if (response.ok) {
        const new_exercise = await response.json();
        dispatch(addExercise(new_exercise));
        return new_exercise;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    }
    return response;
}

export const getExercises = () => async dispatch => {
    const response = await fetch('/api/exercises/');
    if (response.ok) {
        const exercises = await response.json();
        dispatch(loadExercises(exercises));
        return exercises;
    }
    return response;
}

export const editExercise = (payload) => async dispatch => {
    const response = await fetch(`/api/exercises/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const edit_exercise = await response.json();
        dispatch(updateExercise(edit_exercise));
        return edit_exercise;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    }
    return response;
}

export const deleteExercise = (id) => async dispatch => {
    const response = await fetch(`/api/exercises/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const remove_exercise = await response.json();
        dispatch(removeExercise(id));
        return remove_exercise;
    }
    return response;
}



const exerciseReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD:
            newState = { ...state };
            newState[action.new_exercise.id] = action.new_exercise;
            return newState;
        case LOAD:
            newState = { ...state };
            action.exercises.forEach(exercise => newState[exercise.id] = exercise);
            return newState;
        case UPDATE:
            newState = { ...state }
            newState[action.edit_exercise.id] = action.edit_exercise;
            return newState;
        case REMOVE:
            newState = { ...state };
            delete newState[action.remove_exercise];
            return newState;
        default:
            return state;
    }
}

export default exerciseReducer;
