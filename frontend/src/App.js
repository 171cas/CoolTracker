// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import HomePage from './components/HomePage'
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";

import WorkoutDetail from "./components/WorkoutDetail";
import WorkoutBrowser from "./components/WorkoutBrowser";
import WorkoutEdit from "./components/WorkoutEdit";

import ExerciseDetail from "./components/ExerciseDetail";
import ExerciseBrowser from "./components/ExerciseBrowser";
import ExerciseEdit from "./components/ExerciseEdit";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import { getWorkouts } from './store/workouts'
import { getExercises } from './store/exercises'
import { getLikes } from './store/likes'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWorkouts());
    dispatch(getExercises())
    dispatch(getLikes());
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/workouts">
            <WorkoutBrowser />
          </Route>
          <Route exact path="/workout/:workoutId">
            <WorkoutDetail />
          </Route>
          <Route exact path="/workout/:workoutId/edit">
            <WorkoutEdit />
          </Route>
          <Route path="/exercises">
            <ExerciseBrowser />
          </Route>
          <Route exact path="/exercise/:exerciseId">
            <ExerciseDetail />
          </Route>
          <Route exact path="/exercise/:exerciseId/edit">
            <ExerciseEdit />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
