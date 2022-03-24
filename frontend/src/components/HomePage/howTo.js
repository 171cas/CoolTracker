import React, { useState, useEffect } from "react";

function HowTo() {
    const [showMenu, setShowMenu] = useState(false);
    const [title, setTitle] = useState('How to Use Cool-tracker?');


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    const closeMenu = () => {
        setShowMenu(false);
    };
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
                            1) Cool-tracker is an open source web application where clients can create users, and users can create Workouts and add Exercises to their Workouts. Also users can interact with other users and their Workouts as well.<br />
                            <br />
                            2) Clients can try the application without signing up with the 'Demo User' log-in option. Once the clients click the demo user button, they will be logged in with the Demo User account. This will allowed the clients to try all the features provided by the application without signing-up first. Once the clients are satisfied with the interaction, they can create their personal account in the sign-up link.<br />
                            <br />
                            3) Signing Up section has it own Frontend and Backend validations. Characters allowed for usernames are alphanumeric, "." and "_". A Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*") and contain at least 6 characters.<br />
                            <br />
                            4) Logged-in users can create Workouts. The only required attribute for a Workout is the Date, but Notes, Calories Burned, Completion Time and Body Weight are also provided for a more detailed Workout. Later on, users are allowed to modify or delete Workouts created by them. Create, Update and Delete a Workout have their own Fronted and Backend validations as well. Users can log-out their session from their profile page.<br />
                            <br />
                            5) Logged-in users can add Exercises to their own Workouts. The only required attribute for an Exercise is the Name, but Notes, Distance, Sets, Reps, Rest, Weight and Completion Time are also provided for a more detailed Exercise. Later on, users are allowed to modify or delete Exercises created by them. Create, Update and Delete an Exercise have their own Fronted and Backend validations as well. If a Workout is deleted, all the Exercises related to that Workout will be deleted as well.<br />
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
