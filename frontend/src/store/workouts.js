import { csrfFetch } from './csrf';
import { getExercises } from './exercises';

const ADD = '/workouts/add'
const LOAD = '/workouts/load'
const UPDATE = '/workouts/edit'
const REMOVE = '/workouts/remove'


const addWorkout = (new_workout) => ({ type: ADD, new_workout })
const loadWorkouts = workouts => ({ type: LOAD, workouts })
const updateWorkout = (edit_workout) => ({ type: UPDATE, edit_workout })
const removeWorkout = remove_workout => ({ type: REMOVE, remove_workout })


export const createWorkout = (payload) => async dispatch => {
    const response = await csrfFetch('/api/workouts/', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const new_workout = await response.json();
        dispatch(addWorkout(new_workout));
        return new_workout;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data) {
            return data;
        }
    }
    return response;
}

export const getWorkouts = () => async dispatch => {
    const response = await fetch('/api/workouts/');
    if (response.ok) {
        const workouts = await response.json();
        dispatch(loadWorkouts(workouts));
        return workouts;
    }
    return response;
}

export const editWorkout = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/workouts/${payload.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const edit_workout = await response.json();
        dispatch(updateWorkout(edit_workout));
        return edit_workout;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    }
    return response;
}

export const deleteWorkout = (id) => async dispatch => {
    const response = await csrfFetch(`/api/workouts/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const remove_workout = await response.json();
        dispatch(removeWorkout(id));
        return remove_workout;
    }
    return response;
}



const workoutReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case ADD:
            newState = { ...state };
            newState[action.new_workout.id] = action.new_workout;
            return newState;
        case LOAD:
            newState = { ...state };
            action.workouts.forEach(workout => newState[workout.id] = workout);
            return newState;
        case UPDATE:
            newState = { ...state }
            newState[action.edit_workout.id] = action.edit_workout;
            return newState;
        case REMOVE:
            newState = { ...state };
            delete newState[action.remove_workout];
            return newState;
        default:
            return state;
    }
}

export default workoutReducer;
