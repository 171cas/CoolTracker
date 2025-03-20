# CoolTracker

## Technologies Used
- React 
- Redux 
- Express (NodeJs) 
- PostgreSQL 
- Javascript 
- HTML 5 
- CSS 3 

<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' height=75/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://seeklogo.com/images/R/redux-logo-9CA6836C12-seeklogo.com.png' height=75/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://www.mementotech.in/assets/images/icons/express.png' height=75/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://icon-library.com/images/node-js-icon/node-js-icon-8.jpg' height=75/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png' height=75/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2048px-HTML5_logo_and_wordmark.svg.png' height=75/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png' height=75/> <br/><br/>


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


## Getting the Project Started
1. Clone this repository ```git@github.com:171cas/CoolTracker```
2. Install the dependencies ```npm start``` at the frontend and backend directories.
3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL. ```CREATE USER <name>WITH CREATED PASSWORD '<password>'```.
4. Create a ```.env``` file in the backend directory based on the ```.env.example``` found within the respective directory.
5. Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for your ```JWT_SECRET```, an expiration time for ```JWT_EXPIRES_IN``` and your desired ```PORT``` (preferably 5000).
6. Add the following proxy to your ```package.json``` file within your frontend directory, replacing or keeping the 5000 port to match your PORT configuration found in your .env file. ```"proxy": "http://localhost:5000"```.
7. Create the Database, then Migrate, and Seed models (```npx dotenv sequelize db: create;``` ```npx dotenv sequelize db:migrate;``` ```npx dotenv sequelize db:seed:all;```).
8. Start the services in the backend directory (```npm start```).
9. Start the services in the frontend directory (```npm start```), which should open the project in your default browser. If not, navigate to http://localhost:3000 . 
<br/><br/>

## Features:
### Nav bar
A Navegation bar will be rendered in every page of the application. 
If the user is logged out. The navbar will have the following links: Home, Sign Up and Log In.
If the screen is width enough, the user will have the option to log-in directly in the nav bar:

<br/><br/> <img src='https://i.postimg.cc/SSZfnL3P/image-123986672.jpg' height=575/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src='https://user-images.githubusercontent.com/70457320/159936944-ed9a707a-5a3e-445b-a2fb-0f49a4bfdcdf.png' height=575/><br/><br/>

Once the user is logged-in the Navbar will have the following links: Home, My Workouts, My Exercises and Profile.
If the screen is too small (cellphones), these links will be represented by icons:
<br/><br/>
<img src='https://user-images.githubusercontent.com/70457320/159938964-7bf51d00-bb4e-4841-a4ab-fdee8731e584.png' height=475/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src='https://user-images.githubusercontent.com/70457320/159939349-cb368572-7977-4be8-b68a-ef77a4578f56.png' height=475/> 
<br/><br/>


### Home Page / Splash Page
The splash page will show information about the app and how to use it. If the client click the button ```How to Use Cool-tracker```; a completed information about the app will be rendered at the screen. This information can hide again if the user clicks ```Show Less```. 
<br/><br/>
<img src='https://user-images.githubusercontent.com/70457320/159941185-7c838bae-0173-4d87-9adb-473a0bafa37c.png' height=475/> 
<br/><br/>


### My Workouts Page
The Workout page is where the users can create workouts and see all of the previous workouts created by themselves. If a user click the Workout title (link) it will be redirected to the detail page of that workout. If the user is the one who created that workout; a gear will appear next to the title and once it is clicked two buttons will be rendered: ```Delete WorkOut``` and ```Edit Workout``` which will allowed the user to performon those features.
<br/><br/>
<img src='https://user-images.githubusercontent.com/70457320/159942475-bb860c67-b187-420b-ac67-1aa74d0ecb7f.png' height=475/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src='https://user-images.githubusercontent.com/70457320/159943173-fe04c92c-018f-472f-a430-e317dcce8467.png' height=475/> 
<br/><br/>


### My Exercises Page
As shown above, in the workout detail page is where the users can add exercises to their workouts. All exercises belonging to a workout will be rendered below the Add Exercise form. If a user click the exercise title, the page will be redirected to that exercise detail page. If the user is the one who created that exercise; a gear will appear next to the title and once it is clicked two buttons will be rendered: ```Delete Exercise``` and ```Edit Exercise``` which will allowed the user to performon those features.
<br/><br/>
<img src='https://user-images.githubusercontent.com/70457320/159945141-416edc14-41d9-4ea4-b082-59d8b4f345df.png' height=475/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src='https://user-images.githubusercontent.com/70457320/159945548-9725ab52-3211-4812-bd8c-6e8eb03e2d11.png' height=475/> 
<br/><br/>


### My Profile Page
The profile page shows the information about the user; username, image profile, first name, last name and email. Also it will have a log out button that once it's clicked the user's session will be ended.
<br/><br/>
<img src='https://user-images.githubusercontent.com/70457320/159946741-f5b78af6-82e6-4900-b12d-05a9f58422d7.png' height=475/> 
<br/><br/>


### 404 Page Not Found
If the Users try to access a page that doesn't exist the app will render a 404 message and a (hopefully) funny random picture.
<br/><br/>
<img src='https://user-images.githubusercontent.com/70457320/159971210-1e12736a-f958-4a29-ba50-5be84fd865a9.png' height=475/> 

