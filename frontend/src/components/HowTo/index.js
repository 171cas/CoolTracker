import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

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
                            1) Cool-tracker is an open source web application where clients can create and log-in users.
                            Logged-In users can create Workouts, add Exercises to their Workouts and like Workouts.
                            The idea of the app is to keep it as simple and effective as possible, but as detailed as the client wants to.
                            <br /><br />
                            2) Navigation Bar: A Navegation bar will be rendered in every page of the application.
                            If the user is logged out. The navbar will have the following links: Home, Sign Up and Log In.
                            If the screen is width enough, the user will have the option to log-in directly in the nav bar.
                            Once the user is logged-in the Navbar will have the following links: Home (Splash Page), My Workouts, My Exercises and Profile.
                            If the screen is too small (cellphones), these links will be represented by icons which are respectively: A home icon, A dumbbell, a Pen and a User icon.
                            <br /><br />
                            3) Splash Page: This is the first page users will see once they arrived to the application.
                            If the users are not logged-in the page will render information about the app and its features. As well as its developer Cesar Solano with links to his LinkedId and Github.
                            If the users are logged-in the page will render all the workouts created by all the users of the application.
                            One can see this as a public feed where users can interact with each others. Only logged-in users can see/interact with this feed.
                            <br /><br />
                            4) Sign Up Page: This page will render a form for the users to sign-in. Siggning-up has its own Frontend and Backend validations.
                            Characters allowed for usernames are alphanumeric, "." and "_". Username and email must be unique values, there can't be two users with the same username or email
                            A Password must contain at least one lowercase letter, one uppercase letter, one number and one special character (i.e. !@#$%^&*.-_ ), and it must contain at least 6 characters.
                            The users' passwords will be hashed-saved to secure the users' privacy.
                            Logged-In users won't have access to the Sign-In page.
                            <br /><br />
                            5) Log-In Page: This page will render a form for the users to log-in. Logging-in has its own Frontend and Backend validations.
                            A user can log-in with its username (or email) and its password.
                            If the credentials matches the information save in the database, the user will be logged-in and redirected to the Splash Page and welcome message will be rendered.
                            If the credentials are not valid a simple message will be displayed "The provided credentials were invalid". The message is simple in order to protect the users' privacy.
                            If the screen is width enough, the Logging Page's features will be rendered in the Navbar (Login and Password inputs, and Log In and Demo-User buttons).
                            Logged-In users won't have access to the Log-In page.
                            <br /><br />
                            6) Demo User: Clients can try the application without signing up using the 'Demo User' log-in option founded in the Log In page.
                            Once the clients click the demo user button, they will be logged-in with the Demo User account.
                            This will allow the clients to try all the features provided by the application without signing-up first.
                            Once the clients are satisfied with the application, they can create their personal account in the sign-up link.
                            <br /><br />
                            7) My Workouts page: Only logged-in users will have access to this page. This page will render all the workouts created by the session User.
                            It will also render a Create Workout form. Creating a Workout has its own Frontend and Backend validations.
                            A Workout will be a collection of the exercises perfomed during that whole physical activy.
                            Example of workout: "Date: 03/12/2021. Notes: Strength Day during Fasting. Completion Time: 55 mints".
                            The only required attribute for a Workout is the Date, but Notes, Calories Burned, Completion Time and Body Weight are also provided for a more detailed Workout.
                            Why making Date required?
                            Because that's the goal of the app, to keep track of the clients' workouts and its exercises through time so they can evaluate their progression.
                            If a workout is created successfully the user will be redirected to that workout detailed page where the user can read the workout details and add exercises to it.
                            Later on, users are allowed to modify or delete Workouts created by themselves. Update and Delete a Workout have their own Frontend and Backend validations as well.
                            <br /><br />
                            8) My Exercises Page: Only logged-in users will have access to this page. This page will render all the exercises created by the session User.
                            An exercise is the physical movement perfomed, for instance: Bench Press, Run, Hike, and so on.
                            Exercises belongs to a workout, if a workout is deleted all the exercises belonging to that workout will be deleted as well.
                            Workouts are the containers of your exercises.
                            Users can add Exercises to a specific Workout in that Workout's Detail Page only if they created that specific Workout.
                            The only required attribute for an Exercise is the Name, but Notes, Distance, Sets, Reps, Rest, Weight and Completion Time are also provided for a more detailed Exercise.
                            Name is required to know in the future what exercise it was perfomed.
                            Reps and Sets are requerid as well because it is not correct to say 'I completed an exercise of zero rep or zero set'.
                            Regardless of the exercise some one completes, theoretically it will always be at least one set of one rep.
                            Must users forget this when they do a distance exercise, for instance: 3 miles running, 1 mile swimming or 5 mile hiking.
                            All those exercises where one set of one rep.
                            If a user forget to add this theoretically and required data, which is a really common mistake, the app will set those values as Set=1 and Rep=1,
                            rather than (which is somehow anoying) forcing the user to add the value of 1 to those attributes.
                            Later on, users are allowed to modify or delete Exercises created by themselves.
                            Creating, Updating and Deleting an Exercise have their own Frontend and Backend validations as well.
                            <br />
                            <br />
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
