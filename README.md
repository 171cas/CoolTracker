# CoolTracker
[Try the site live here](https://cool-tracker.herokuapp.com/)

Important Links of the Project:
* [CoolTracker Capstone](https://github.com/171cas/CoolTracker/wiki)
* [API Routes](https://github.com/171cas/CoolTracker/wiki/API-Routes)
* [Database Schema](https://github.com/171cas/CoolTracker/wiki/Database-Schema)
* [Feature List](https://github.com/171cas/CoolTracker/wiki/Feature-List)
* [User Stories](https://github.com/171cas/CoolTracker/wiki/User-Stories)
* [Wireframes](https://github.com/171cas/CoolTracker/wiki/Wireframes)

CoolTracker is a general workout tracker application with features inspired on Instagram and twitter. Users can create a workout and add exercises to it and be able to see their past workouts and exercises in order to know their progression. Clients can create users, and users can create, edit and delete Workouts and Exercises. Also users can interact with other users and their Workouts as well.

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
- React <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' height=45/>
- Redux
- Express
- Sequelize
- HTML & CSS

##Getting the Project Started
1. Clone this repository ```git@github.com:171cas/CoolTracker```
2. Install the dependencies ```npm start``` at the frontend and backend directories.
3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL. ```CREATE USER <name>WITH CREATED PASSWORD '<password>'```.
4. Create a ```.env``` file in the backend directory based on the ```.env.example``` found within the respective directory.
5. Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for your ```JWT_SECRET```, an expiration time for ```JWT_EXPIRES_IN``` and your desired ```PORT``` (preferably 5000).
6. Add the following proxy to your ```package.json``` file within your frontend directory, replacing or keeping the 5000 port to match your PORT configuration found in your .env file. ```"proxy": "http://localhost:5000"```.
7. Create the Database, then Migrate, and Seed models (```npx dotenv sequelize db: create;``` ```npx dotenv sequelize db:migrate;``` ```npx dotenv sequelize db:seed:all;```).
8. Start the services in the backend directory (```npm start```).
9. Start the services in the frontend directory (```npm start```), which should open the project in your default browser. If not, navigate to http://localhost:3000 . 
