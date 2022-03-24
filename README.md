# CoolTracker
https://cool-tracker.herokuapp.com/

CoolTracker is a general workout tracker application with features inspired on Instagram and twitter. Users can create a workout and add exercises to it and be able to see their past workouts and exercises in order to know their progression.

Cool-tracker is an open source web application where clients can create users, and users can create Workouts and add Exercises to their Workouts. Also users can interact with other users and their Workouts as well.

Clients can try the application without signing up using the 'Demo User' log-in option. Once the clients click the demo user button, they will be logged in with the Demo User account. This will allowed the clients to try all the features provided by the application without signing-up first. Once the clients are satisfied with the interaction, they can create their personal account in the sign-up link.

Signing Up section has it own Frontend and Backend validations. Characters allowed for usernames are alphanumeric, "." and "_". A Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. !@#$%^&*.-\_) and contain at least 6 characters.

Logged-in users can create Workouts. The only required attribute for a Workout is the Date, but Notes, Calories Burned, Completion Time and Body Weight are also provided for a more detailed Workout. Later on, users are allowed to modify or delete Workouts created by themselves. Create, Update and Delete a Workout have their own Fronted and Backend validations as well. Users can log-out their session from their profile page. If some Users forget to log out, the application will logged them out after a certain period of time (current time: 1 week).

Logged-in users can add Exercises to their own Workouts. The only required attribute for an Exercise is the Name, but Notes, Distance, Sets, Reps, Rest, Weight and Completion Time are also provided for a more detailed Exercise. Later on, users are allowed to modify or delete Exercises created by themselves. Create, Update and Delete an Exercise have their own Fronted and Backend validations as well. If a Workout is deleted, all the Exercises related to that Workout will be deleted as well.

Some functionality of a user will be:
- Create an account, sign in or log in as a Demo-User or with its own account, log out.
- Create, view, edit and delete:
   - Workouts
   - Exercises
Future functionality: (coming soon)
- Create and Delete:
   - Likes
   - Comments
   - Direct Messages to other Users
- Follow and Unfollow Users

## Technologies Used
- React
- Redux
- Express
- Sequelize
- HTML & CSS
