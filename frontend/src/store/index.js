import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import usersReducer from "./users";
import workoutReducer from './workouts';
import exerciseReducer from './exercises';
import likeReducer from './likes';
import commentReducer from "./comments";
import followerReducer from "./followers";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  users: usersReducer,
  workouts: workoutReducer,
  exercises: exerciseReducer,
  likes: likeReducer,
  comments: commentReducer,
  followers: followerReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
