# Application "Mini scrum app"

## Description
A simple project management application using the SCRUM method. Each project has four columns: backlog, todo, doing, done, between which tasks are transferred depending on the stage they are currently at. The application consists of two separate parts: a frontend part made in React.js (TypeScript), a backend part made in Node.js (TypeScript) and a MySQL database running on the XAMPP application. Frontend uses RestAPI to communicate with the backend.
Everything works locally on localhost (no user authorization and authentication, there are simple validation of user input). 

## Technology stack and techniques used

### Data-base
- MySQL (XAMPP, mysql2 driver)

### Back-end
- Nest.js (TypeScript)
- Active Record Pattern
- Type sharing between Front-end and Back-end
- Used packages:
    - cors
    - mysql2

### Front-end
- React.js (TypeScript)
- SCSS
- Used packages:
    - node-sass

## Database structure
<div align="center"> 
  <img src="https://user-images.githubusercontent.com/76522657/199962128-ed8c393a-ba4c-4711-9911-0ac11e9811a0.png" alt="screenshot" />
</div>

## Endpoints (REST API)
| HTTP method | endpoint | what does it do |
|-------------|----------|-----------------|
| (GET) | http://localhost:3000/api/v2/projects | gets all projects |
| (GET) | http://localhost:3000/api/v2/projects/:id | gets one project with id |
| (POST) | http://localhost:3000/api/v2/projects | adds new project |
| (PUT) | http://localhost:3000/api/v2/projects/:id | modifies the project with id |
| (DELETE) | http://localhost:3000/api/v2/projects/:id | deletes the project with id |
| (GET) | http://localhost:3000/api/v2/projects/:id/sprints | gets all sprints for project with id |
| (POST) | http://localhost:3000/api/v2/projects/:id/sprints | adds new sprint for project with id |
| (PUT) | http://localhost:3000/api/v2/sprints/:id | modifies the sprint with id |
| (DELETE) | http://localhost:3000/api/v2/sprints/:id | deletes the sprint with id |
| (GET) | http://localhost:3000/api/v2/projects/:id/tasks | gets all tasks for project with id |
| (POST) | http://localhost:3000/api/v2/projects/:id/tasks | adds new task for project with id |
| (PUT) | http://localhost:3000/api/v2/tasks/:id | modifies the task with id |
| (DELETE) | http://localhost:3000/api/v2/tasks/:id | deletes the task with id |
| (PUT) | http://localhost:3000/api/v2/projects/:id/tasks/time | updates tick time in DOING columns for the project with id |
| (PUT) | http://localhost:3000/api/v2/sprints/:idChosenSprint/tasks/:idTask/:direction | moves the tags between the BACKLOG, TODO, DOING, DONE columns for an active sprint. Direction is 'right' or 'left' |

## How does it work
<div align="center"> 
  <img src="https://user-images.githubusercontent.com/76522657/199970075-e463b8ee-4bcc-4f30-84e0-4845dcf059d1.png" alt="screenshot" />
<img src="https://user-images.githubusercontent.com/76522657/199970094-95698023-6fc9-4c30-9bb4-0b74a5cb4f14.png" alt="screenshot" />
<img src="https://user-images.githubusercontent.com/76522657/199970107-b11b783a-8c02-40f9-aee1-5440763d2a37.png" alt="screenshot" />
<img src="https://user-images.githubusercontent.com/76522657/199970123-8f57351d-1f9d-4dd5-b3b5-bb8dd1d8a44a.png" alt="screenshot" />
</div>

## How to install
1. open the main project directory in the console
2. cd backend
3. npm install
4. run the XAMPP application (Apache and MySQL)
5. create any database (name in project: mini_scrum_app)
6. import the sample database from db/db_example_v2_0_0.sql
7. cd frontend
8. npm install

## How to run
1. run the XAMPP application (Apache and MySQL)
2. open the main project directory in the console
3. cd backend
4. nest start --watch [(or): npx nest start --watch] (working on localhost:3001)
5. cd frontend
6. npm start (working on localhost:3000)
7. run the browser
8. enter: localhost:3000