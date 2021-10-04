# Application "Mini scrum app"

## Description
A simple project management application using the SCRUM method. Each project has four columns: backlog, todo, doing, done, between which tasks are transferred depending on the stage they are currently at. The application consists of a frontend part made in React.js, a backend part made in Express.js and a mysql database running on the XAMPP application. Frontend uses RestFullAPI to communicate with the backend.
Everything works locally on localhost (no user authorization, validation of user input, CORS adapted to run on localhost - do not use outside localhost). 

## How to install
1. open the console
2. cd frontend
3. npm install
4. npm run build (the backend uses this directory as static)
5. cd ../backend
6. npm install
7. run the XAMPP application (Apache and MySQL)
8. create any database (name in project: mini_scrum_app)
9. import the sample database from the directory: backend / my_modules / db_mysql / *. Sql

## How to run
1. run the XAMPP application (Apache and MySQL)
2. open the console
3. cd backend
4. node server.js
5. run the browser
6. enter localhost:3000
