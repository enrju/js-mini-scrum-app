const port = process.env.PORT || 3000;
const host = '127.0.0.1';

const express = require('express');
const path = require('path');

const { projectsRoutes } = require('./routes/projects');
const { sprintsRoutes } = require('./routes/sprints');
const { tasksRoutes } = require('./routes/tasks');

const server = express();
server.listen(port, host, () => {
    console.log('server is working');
});

server.use(express.static(path.join(__dirname, '../frontend/build')));

//routing here
projectsRoutes(server);
sprintsRoutes(server);
tasksRoutes(server);