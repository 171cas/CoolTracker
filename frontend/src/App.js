import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import HomePage from './components/HomePage'
import WorkoutPublic from "./components/WorkoutPublic";
import SplashPage from "./components/SplashPage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";

import ProfilePage from "./components/ProfilePage";
import ProfileUser from "./components/ProfileUser";

import WorkoutDetail from "./components/WorkoutDetail";
import WorkoutBrowser from "./components/WorkoutBrowser";
import WorkoutEdit from "./components/WorkoutEdit";

import ExerciseDetail from "./components/ExerciseDetail";
import ExerciseBrowser from "./components/ExerciseBrowser";
import ExerciseEdit from "./components/ExerciseEdit";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLogOutRoute from "./components/ProtectedLogOutRoute";

import GoBack from "./components/GoBack";

import NotFound from "./components/NotFound";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import { getWorkouts } from './store/workouts'
import { getExercises } from './store/exercises'
import { getLikes } from './store/likes'
import { getUsers } from "./store/users";

import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWorkouts());
    dispatch(getExercises());
    dispatch(getLikes());
    dispatch(getUsers());
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage isLoaded={isLoaded} />
          </Route>
          <ProtectedLogOutRoute exact path="/login">
            <div className='containerWO'>
              <div className='singleWO' style={{ maxWidth: '300px' }}>
                <h3 style={{ textDecoration: "none" }}>But first, Log In:</h3>
                <LoginFormPage />
              </div>
            </div>
          </ProtectedLogOutRoute>
          <ProtectedLogOutRoute exact path="/signup">
            <SignupFormPage />
          </ProtectedLogOutRoute>
          <ProtectedRoute exact path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/user/:profUserId">
            <ProfileUser />
          </ProtectedRoute>
          <ProtectedRoute exact path="/workouts">
            <WorkoutBrowser />
          </ProtectedRoute>
          <ProtectedRoute exact path="/workout/:workoutId">
            <WorkoutDetail />
          </ProtectedRoute>
          <ProtectedRoute exact path="/workout/:workoutId/edit">
            <WorkoutEdit />
            <GoBack />
          </ProtectedRoute>
          <ProtectedRoute exact path="/exercises">
            <div className='containerWO'>
              <div className='singleWO'>
                <h3 style={{ textDecoration: "none" }} >Exercises</h3>
                <ExerciseBrowser />
              </div>
            </div>
          </ProtectedRoute>
          <ProtectedRoute exact path="/exercise/:exerciseId">
            <div className='containerWO'>
              <div className='singleWO'>
                <h3 style={{ color: 'white' }}>Exercise Detail:</h3>
                <ExerciseDetail />
              </div>
            </div>
            <GoBack />
          </ProtectedRoute>
          <ProtectedRoute exact path="/exercise/:exerciseId/edit">
            <div className='containerWO'>
              <div className='singleWO'>
                <ExerciseEdit />
              </div>
            </div>
          </ProtectedRoute>
          <ProtectedRoute >
            <NotFound />
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}


export default App;
