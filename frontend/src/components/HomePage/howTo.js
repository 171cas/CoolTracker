import React, { useState, useEffect } from "react";

function HowTo() {
    const [showMenu, setShowMenu] = useState(false);
    const [title, setTitle] = useState('How to Use Cool-tracker?');

    const changemenu = () => {
        setShowMenu(!showMenu);
    }

    useEffect(() => {
        if (!showMenu) {
            setTitle('How to Use Cool-tracker?')
            return;
        }
        if (showMenu) {
            setTitle('Show Less')
            return;
        }
    }, [showMenu]);


    return (
        <>
            <button onClick={changemenu} className="addButton">{title}</button>
            {showMenu && (
                <>
                    <div className="paraClass">
                        <p>
                            How to use Cool-tracker:<br />
                            1) Cool-tracker is an open source web application where clients can create users, and users can create Workouts and add Exercises to their Workouts. The idea of the app is to keep it as simple and effective as possible, but as detailed as the client wants to. Also, users can interact with other users and their Workouts as well.<br />
                            <br />
                            2) Clients can try the application without signing up with the 'Demo User' log-in option. Once the clients click the demo user button, they will be logged in with the Demo User account. This will allow the clients to try all the features provided by the application without signing-up first. Once the clients are satisfied with the interaction, they can create their personal account in the sign-up link.<br />
                            <br />
                            3) Sign Up has it own Frontend and Backend validations. Characters allowed for usernames are alphanumeric, "." and "_". A Password must contain at least one lowercase letter, uppercase letter, number and special character (i.e. !@#$%^&*.-_ ) and contain at least 6 characters.<br />
                            <br />
                            4) Logged-in users can create Workouts. The only required attribute for a Workout is the Date, but Notes, Calories Burned, Completion Time and Body Weight are also provided for a more detailed Workout.
                            Why only keeping Date required though? Because that's the goal of the app, to keep track of the clients' workouts and exercises through time so they can evaluate their progression
                            Later on, users are allowed to modify or delete Workouts created by themselves. Create, Update and Delete a Workout have their own Frontend and Backend validations as well. Users can log-out of their sessions from their profile pages.<br />
                            <br />
                            5) Logged-in users can add Exercises to their own Workouts. The only required attribute for an Exercise is the Name, but Notes, Distance, Sets, Reps, Rest, Weight and Completion Time are also provided for a more detailed Exercise.
                            Name is required to know in the future what exercise was .
                            Reps and Sets are requerid as well, and they will be automatically saved by the app.
                            Later on, users are allowed to modify or delete Exercises created by themselves. Create, Update and Delete an Exercise have their own Frontend and Backend validations as well. If a Workout is deleted, all the Exercises related to that Workout will be deleted as well.<br />
                            <br />
                            6) The idea of the app is to keep it as simple and effective as possible, but as detailed as the client wants to. That's why the only required data for a workout is the date, everything else is up to the user. Why keeping Date required though? Because that's the goal of the app, to keep track of the clients' workouts and exercises through time so they can evaluate their progression.
                            In the same way, the only required data for an exercise is the name, but also reps, sets and workout id will be automatically saved by the app, or in other words they are required as well. Name is required for obvious reasons, it's not the same three set of eight reps of bench press than squat.
                            The exercises exist whitin a workout, that is why the app saves a workout id data. If the workout where the exercises exist is deleted, all the exercises belonging to it will be deleted as well.
                            Sets and Reps are automatically saved (required data) because regardless of the exercise some one completes, theoretically it will always be at least one set of one rep.
                            Must of users forget about this when they do a distance exercise, for instance: 3 miles running, 1 mile swimming or 5 mile hiking. All those exercises where one set of one rep. If a user forget to add this theoretically and required data, which is a really common mistake, the app will set those values as Set=1 and Rep=1.
                            <br />
                        </p>
                    </div>
                    <button onClick={changemenu} className="addButton">{title}</button>
                </>
            )}
        </>
    );
}

export default HowTo;
